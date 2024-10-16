import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Database, getDatabase, onValue, ref, set } from 'firebase/database';
import app from './firebase.config';
import { FirebaseAuthError } from 'firebase-admin/lib/utils/error';

@Injectable()
export class FirebaseService {
  private db: Database;

  constructor() {
    this.db = getDatabase(app);
  }

  async writeDataBase(path: string, data: any): Promise<void> {
    const reference = ref(this.db, path);
    await set(reference, data);
  }

  async readDataBase(path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const reference = ref(this.db, path);
      onValue(
        reference,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const dataArray = Object.entries(data).map(([key, value]) => ({
              id: key,
              ...(value as object),
            }));
            resolve(dataArray);
          } else {
            resolve([]);
          }
        },
        (error) => {
          const data = error as FirebaseAuthError;
          if (data.code === 'PERMISSION_DENIED') {
            reject(new UnauthorizedException('Пользователь не авторизован'));
          } else {
            reject(new BadRequestException('Ошибка чтения из базы данных'));
          }
        },
      );
    });
  }
}
