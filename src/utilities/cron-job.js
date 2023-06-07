import { CronJob as Cron } from 'cron';

export class CronJob {
    static #cronJobs = {};
    #job;
    cronSchedule;
    // onTick;
    constructor(jobName, cronSchedule) {
        if (CronJob.#cronJobs[jobName]) {
            throw new Error(`CronJob with name ${jobName} already exists!`);
        }
        this.jobName = jobName;
        this.cronSchedule = cronSchedule;
        CronJob.#cronJobs[jobName] = this;
    }
    start() {
        if (!this.cronSchedule || !this.onTick) {
            throw new Error(`CronJob with name ${this.jobName} is not configured properly!`);
        }
        if (typeof this.onTick !== 'function') {
            throw new Error("You must implement onTick method!");
        }
        if (this.#job) {
            throw new Error(`CronJob with name ${this.jobName} is already running!`);
        }

        this.#job = new Cron(this.cronSchedule, this.onTick.bind(this));
        this.#job.start();
    }

}