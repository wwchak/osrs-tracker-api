import { exists, mkdir } from 'fs';
import { join } from 'path';
import { Logger } from '../logger';

export class FileSystemUtils {
  static createIconsFolderIfMissing(): void {
    const iconsPath = join(__dirname, '/icons/');

    exists(iconsPath, exists => {
      if (!exists) mkdir(iconsPath, () => Logger.log('CREATED ICONS FOLDER'));
    });
  }
}
