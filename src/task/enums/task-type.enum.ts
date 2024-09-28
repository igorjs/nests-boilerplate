import { $Enums } from '@prisma/client';

export type TaskType = keyof typeof $Enums.TaskType;

export const TaskType = $Enums.TaskType;
