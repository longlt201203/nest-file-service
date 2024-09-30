import * as multer from "multer";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";

export const multerStorage = (uploadsFolder: string) =>
	/**
	 * Multer storage configuration.
	 * @param req - Express request object
	 * @param file - Multer file object
	 * @param cb - Callback function
	 */
	multer.diskStorage({
		/**
		 * Destination callback.
		 * Checks if the uploads folder exists, creates it if not, and sets the destination folder.
		 */
		destination: (req, file, cb) => {
			if (!fs.existsSync(uploadsFolder)) {
				fs.mkdirSync(uploadsFolder);
			}
			cb(null, uploadsFolder);
		},
		/**
		 * Filename callback.
		 * Generates a unique filename to avoid conflicts.
		 */
		filename: (req, file, cb) => {
			const fileInfo = file.originalname.split(".");
			let filename = `${uuidv4()}.${fileInfo[1]}`;
			// let filepath = `${uploadsFolder}/${filename}`;
			// let i = 1;
			// while (fs.existsSync(filepath)) {
			// 	filename =
			// 		fileInfo[0] +
			// 		` (${i})` +
			// 		(fileInfo.length > 1 ? `.${fileInfo[1]}` : "");
			// 	filepath = `${uploadsFolder}/${filename}`;
			// 	i++;
			// }
			cb(null, filename);
		},
	});
