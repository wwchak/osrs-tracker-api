import { Application, Router } from 'express';
import { createWriteStream, exists, readFile } from 'fs';
import fetch from 'node-fetch';
import { join } from 'path';
import { RouterFactory } from './router.interface';

export class IconRouter implements RouterFactory {
  create(app: Application): void {
    const router = Router();

    this.getIcon(router);

    app.use('/icon', router);
  }

  private getIcon(router: Router): void {
    router.get('/:id', (req, res) => {
      const itemId = req.params.id;
      const iconPath = join(__dirname, '/icons/', `${itemId}.gif`);

      this.iconExists(iconPath)
        .then(exists =>
          exists
            ? this.getIconFile(iconPath)
            : this.getIconUrl(itemId).then(iconUrl => this.downloadIcon(iconPath, iconUrl))
        )
        .then(iconFile => {
          res.type('image/gif');
          res.setHeader('Content-Disposition', `inline; filename="${itemId}.gif"`);
          res.send(iconFile);
        })
        .catch(() => res.sendStatus(404));
    });
  }

  private iconExists(iconPath: string): Promise<boolean> {
    return new Promise(resolve => {
      exists(iconPath, exists => resolve(exists));
    });
  }

  private getIconFile(iconPath: string): Promise<Buffer> {
    return new Promise(resolve => {
      readFile(iconPath, (err, data) => resolve(data));
    });
  }

  private getIconUrl(itemId: number): Promise<string> {
    return fetch(`http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=${itemId}`)
      .then(res => {
        if (res.status === 404) throw new Error('404');
        return res.json();
      })
      .then(body => body.item.icon_large);
  }

  private downloadIcon(iconPath: string, iconUrl: string): Promise<Buffer> {
    return new Promise(resolve => {
      fetch(iconUrl)
        .then()
        .then(response => {
          const stream = createWriteStream(iconPath);
          stream.on('finish', () => resolve(this.getIconFile(iconPath)));
          response.body.pipe(stream);
        });
    });
  }
}
