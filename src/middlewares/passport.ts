import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import config from '../config/index';
import { NotFound } from '@curveball/http-errors';
import { findUser } from '../services/user.service';

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.SECRET
};

export default new Strategy(opts, async (jwtPayload, done) => {
    try {
        const user = await findUser(jwtPayload.id, { select: ['id'] });
        if (!user) {
            throw new NotFound('User not found');
        }
        return done(null, user.id);
    } catch (err) {
        done(null, false);
    };
});