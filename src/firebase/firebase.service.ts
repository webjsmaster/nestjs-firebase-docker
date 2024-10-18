import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  Database,
  getDatabase,
  onValue,
  push,
  ref,
  set,
} from 'firebase/database';
import app from './firebase.config';
import { FirebaseAuthError } from 'firebase-admin/lib/utils/error';

@Injectable()
export class FirebaseService {
  private db: Database = getDatabase(app);

  public async writeDataBase(path: string, data: any): Promise<void> {
    const listRef = ref(this.db, path);
    return new Promise<void>((resolve, reject) => {
      const newRef = push(listRef);
      set(newRef, data)
        .then(() => resolve())
        .catch((error) => this.errorHandler(error, reject));
    });
  }

  public async readDataBase(path: string): Promise<any> {
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
          this.errorHandler(error, reject);
        },
      );
    });
  }

  private errorHandler(error: Error, reject: any): void {
    const data = error as FirebaseAuthError;
    if (data.code === 'PERMISSION_DENIED') {
      reject(new UnauthorizedException('Пользователь не авторизован'));
    } else {
      reject(new BadRequestException('Ошибка чтения из базы данных'));
    }
  }
}
