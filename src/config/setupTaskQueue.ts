import chalk from "chalk";
import { di } from "./DIContainer";
import { appLogger } from "./winstonLogger";
import { CronService } from "@/services/cron";
import appConfig from "@/constants/appConfig";
import { CronContract } from "@/contracts/cron";

/**
 * Запуск очереди задач
 */
export const setupTaskQueue = (): void => {
  const cronService = di.container.resolve<CronService>(CronService.key);

  if (appConfig.ENABLED_TASKS.length) {
    const coloredEnabledTasks = chalk.bold(appConfig.ENABLED_TASKS.join(", "));

    appLogger.info(`Установка задач (${coloredEnabledTasks})...`);

    for (const taskName of appConfig.ENABLED_TASKS) {
      switch (taskName) {
        case CronContract.ClearingUnusualSessions.name:
          cronService.addTask(CronContract.ClearingUnusualSessions);
          break;

        default:
          appLogger.error(`Не удалось определить название задачи: ${taskName}`);
      }
    }
  }

  appLogger.verbose("Очередь задач успешно настроена");
};
