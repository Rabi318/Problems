"use strict";
class TaskCreator {
    createTask(name) {
        console.log(`Creating task: ${name}`);
    }
}
class EmailService {
    sendEmail(to) {
        console.log(`Sending email to ${to}`);
    }
}
const taskCreator = new TaskCreator();
taskCreator.createTask("Finish report");
const emailService = new EmailService();
emailService.sendEmail("team@duckcorp.com");
