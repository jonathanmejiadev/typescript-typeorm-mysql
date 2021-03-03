import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import User from '../api/entity/User';
import config from '../config/index';
import { NotFound } from '@curveball/http-errors';

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.SECRET
};

export default new Strategy(opts, async (jwtPayload, done) => {
    try {
        const user = await User.findOne(jwtPayload.id, { select: ['id'] });
        if (!user) {
            throw new NotFound('User not found');
        }
        return done(null, user.id);
    } catch (err) {
        done(null, false);
    }
});