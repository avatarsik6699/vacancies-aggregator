import bcrypt from "bcryptjs";

export const asyncBcrypt = (password: string, rounds = 3) => {
	return new Promise<string>((resolve, reject) => {
		bcrypt.genSalt(rounds, function (err, salt) {
			if (err) reject(err);

			bcrypt.hash(password, salt, function (err, hash) {
				if (err) reject(err);
				resolve(hash);
			});
		});
	});
};
