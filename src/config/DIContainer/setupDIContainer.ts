import { di } from "./awilixManager";
import { asClass, asValue } from "awilix";
import { appLogger } from "../winstonLogger";
import { AuthService } from "@/services/auth";
import { CronService } from "@/services/cron";
import { UserService } from "@/services/user";
import { Session, User } from "@/entities/user";
import appDataSource from "@/constants/appDataSource";

/**
 * Внедрить зависимости в DI-контейнер
 */
export const setupDIContainer = (): void => {
  appLogger.info("Внедрение зависимостей...");

  // Таблицы операционной базы данных
  const userRepository = appDataSource.getRepository(User);
  const sessionRepository = appDataSource.getRepository(Session);

  di.container.register({
    userRepository: asValue(userRepository),
    sessionRepository: asValue(sessionRepository),

    [CronService.key]: asClass(CronService).singleton(),
    [AuthService.key]: asClass(AuthService).singleton(),
    [UserService.key]: asClass(UserService).singleton(),
  });

  appLogger.verbose("Зависимости внедрены");
};
