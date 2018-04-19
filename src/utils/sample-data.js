import moment from "moment";
import faker from "faker";

export function generateSampleMessages(n = 10) {
   let messages = [];
   for (let i = 0; i < n; i++) {
      let message = {};
      message.id = faker.random.uuid();
      message.text = faker.lorem.lines();
      message.date = moment(faker.date.past());
      messages.push(message);
   }
   return messages;
}

export function generateSampleThreads(n = 10, numMessages) {
   let threads = [];
   for (let i = 0; i < n; i++) {
      let thread = {};
      thread.id = faker.random.uuid();
      thread.date = moment(faker.date.past());
      thread.name = faker.name.findName();
      thread.imageURL = faker.image.avatar();
      thread.messages = generateSampleMessages(numMessages);
      threads.push(thread);
   }
   return threads;
}
