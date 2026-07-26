import * as bcrypt from 'bcrypt'

export class HashHelper {
    static comparePassword(password, hash):boolean {
        return bcrypt.compareSync(password, hash
            //     , function (err, isMatch) {
            //     if (err) return cb(err);
            //     cb(null, isMatch);
            // }
        );
    };
}