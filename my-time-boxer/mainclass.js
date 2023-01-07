const TASK_STATUS = {
    NOT_STARTED: 0,
    IN_PROGRESS: 1,
    HARD_STOPPED: 2,
    COMPLETED: 3,
    RUNNING_LATE: 4
};

class TimeBoxerApp {
    constructor() {
        this.dayStartDateTime = new Date('2022-10-08T10:00:00');
        this.dayEndDateTime = new Date('2022-10-08T17:30:00');
        this.lastTaskEndTime = this.dayStartDateTime;
        this.taskList = [];    
    }
    addTasks(taskName, endTime) {
        this.taskList.push({
            name: taskName,
            endTime,
            taskStatus: TASK_STATUS.NOT_STARTED
        });
        if (this.lastTaskEndTime.getTime() < endTime.getTime()) {
            this.lastTaskEndTime = endTime;
        }
        if (endTime.getTime() < this.lastTaskEndTime.getTime()) {
            console.log('Warning: Overtime Detected');
        }
    }
    sortTasks() {
        this.taskList.sort((a,b) => {
            return a.endTime.getTime() - b.endTime.getTime();
        })
    }
    getTasks() {
        this.taskList.forEach(task => {
            const taskName = task.name;
            const taskDeadline = `${task.endTime.getHours()}:${task.endTime.getMinutes()}`
            console.log('-----------------------------------');
            console.log(`${taskName} ends on ${taskDeadline} Hours`);
            if (task.taskStatus === TASK_STATUS.RUNNING_LATE) {
                console.log('This task is running late.');
            }
        })
        console.log('-----------------------------------');;
    }
    markTaskAsComplete(taskId) {
        const taskEdit = this.taskList[taskId];
        taskEdit.taskStatus = TASK_STATUS.COMPLETED;
    }
    markTaskAsHardStop(taskId) {
        const taskEdit = this.taskList[taskId];
        taskEdit.taskStatus = TASK_STATUS.HARD_STOPPED;
    }
    updateTaskStatuses(){
        this.taskList.forEach(task => {
            if (task.taskStatus !== TASK_STATUS.COMPLETED) {
                if (task.endTime.getTime() < new Date().getTime()) {
                    task.taskStatus = TASK_STATUS.RUNNING_LATE;
                }
            }
        })
    }
}

const timeBoxerApp = new TimeBoxerApp();
timeBoxerApp.addTasks('Fuck Ornika', new Date('2022-10-08T10:30:00'));
timeBoxerApp.addTasks('Whip Sonal', new Date('2022-10-08T12:30:00'));
timeBoxerApp.addTasks('Fuck Ornika again', new Date('2022-10-08T14:30:00'));
timeBoxerApp.addTasks('Anal punish Kratika', new Date('2022-10-08T17:45:00'));
timeBoxerApp.updateTaskStatuses();
timeBoxerApp.markTaskAsComplete(0);
timeBoxerApp.markTaskAsComplete(1);
timeBoxerApp.getTasks();
