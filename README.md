# SMS.ir API

`smsir` allows you to communicate with the SMS.ir API to send and receive SMS messages. The API key and default line number for your SMS.ir account are required to create a new instance of the Smsir class.

## Installation

This package is available on npm as [`smsir`](https://npmjs.com/package/smsir). You can install it using either npm or yarn.

With npm:

```bash
npm install smsir
```

With yarn:

```bash
yarn add smsir
```

## Usage

To use this class in your JavaScript or TypeScript code, first import it:

```javascript
import { Smsir } from "smsir";
```

Then create a new instance of the Smsir class using your SMS.ir API key and default line number:

```javascript
const sms = new Smsir("YOUR_API_KEY", YOUR_LINE_NUMBER);
```

You can then use the methods of the Smsir class to interact with the SMS.ir API. For example, to send a single SMS message to a single recipient:

```javascript
sms.Send("Hello World!", "RECIPIENT_MOBILE_NUMBER");
```

## Methods

The following methods are available in the Smsir class:

### constructor()

`constructor(apiKey: string, lineNumber: number)`

Create a new instance of the Smsir class.

-   `apiKey`: The API key for your SMS.ir account.
-   `lineNumber`: The default line number to use for sending messages.

#### Example

```js
const sms = new Smsir("YOUR_API_KEY", YOUR_LINE_NUMBER);
```

### Send()

`Send(MessageText: string, Mobile: string, SendDateTime: number | null = null, lineNumber: number = this.DefaultLineNumber): Promise<any>`

Send a single SMS message to a single recipient.

-   `MessageText`: The text of the message to send.
-   `Mobile`: The mobile number of the recipient.
-   `SendDateTime`: (optional) The Unix timestamp of when to send the message (null for immediate sending).
-   `lineNumber`: (optional) The line number to use for sending the message.

#### Example

```js
sms.Send("Hello World!", "RECIPIENT_MOBILE_NUMBER");
```

### SendBulk()

`SendBulk(MessageText: string, Mobiles: Array<string>, SendDateTime: number | null = null, lineNumber: number = this.DefaultLineNumber): Promise<any>`

Send a single SMS message to multiple recipients.

-   `MessageText`: The text of the message to send.
-   `Mobiles`: An array of mobile numbers of the recipients.
-   `SendDateTime`: (optional) The Unix timestamp of when to send the message (null for immediate sending).
-   `lineNumber`: (optional) The line number to use for sending the message.

#### Example

```javascript
sms.SendBulk("Hello World!", ["RECIPIENT_MOBILE_NUMBER_1", "RECIPIENT_MOBILE_NUMBER_2"]);
```

### SendLikeToLike()

`SendLikeToLike(MessageTexts: string, Mobiles: Array<string>, SendDateTime: number | null = null, lineNumber: number | null = null): Promise<any>`

Send multiple SMS messages to multiple recipients (one message per recipient).

-   `MessageTexts`: The text of the messages to send.
-   `Mobiles`: An array of mobile numbers of the recipients.
-   `SendDateTime`: (optional) The Unix timestamp of when to send the message (null for immediate sending).
-   `lineNumber`: (optional) The line number to use for sending the message (null for default line number).

#### Example

```js
sms.SendLikeToLike(["Hello World 1!", "Hello World 2!"], ["RECIPIENT_MOBILE_NUMBER_1", "RECIPIENT_MOBILE_NUMBER_2"]);
```

### DeleteScheduled()

`DeleteScheduled(PackId: number): Promise<any>`

Delete a scheduled SMS message.

-   `PackId`: The ID of the scheduled message pack to delete.

#### Example

```js
sms.DeleteScheduled(SCHEDULED_MESSAGE_PACK_ID);
```

### SendVerifyCode()

`SendVerifyCode(Mobile: string, TemplateId: number, Parameters: Array<any>): Promise<any>`

Send a verification code via SMS.

-   `Mobile`: The mobile number of the recipient.
-   `TemplateId`: The ID of the verification code template to use.
-   `Parameters`: An array of parameters to use in the verification code template.

#### Example

```js
sms.SendVerifyCode("RECIPIENT_MOBILE_NUMBER", TEMPLATE_ID, [PARAMETER_1, PARAMETER_2]);
```

### ReportMessage()

`ReportMessage(MessageId: number): Promise<any>`

Get a report on a specific sent SMS message.

-   `MessageId`: The ID of the sent message to get a report on.

#### Example

```js
sms.ReportMessage(MESSAGE_ID);
```

### ReportPack()

`ReportPack(PackId: number): Promise<any>`

Get a report on a specific sent SMS message pack.

-   `PackId`: The ID of the sent message pack to get a report on.

#### Example

```js
sms.ReportPack(PACK_ID);
```

### ReportToday()

`ReportToday(pageSize: number = 10, pageNumber: number = 1): Promise<any>`

Get a report on today's sent SMS messages.

-   `pageSize`: (optional) The number of results to return per page.
-   `pageNumber`: (optional) The page number to return results for.

#### Example

```js
sms.ReportToday(PAGE_SIZE, PAGE_NUMBER);
```

### ReportArchived()

`ReportArchived(fromDate: number | null = null, toDate: number | null = null, pageSize: number = 10, pageNumber: number = 1): Promise<any>`

Get a report on archived sent SMS messages.

-   `fromDate`: (optional) The start date to get results for (null for no start date).
-   `toDate`: (optional) The end date to get results for (null for no end date).
-   `pageSize`: (optional) The number of results to return per page.
-   `pageNumber`: (optional) The page number to return results for.

#### Example

```js
sms.ReportArchived(FROM_DATE, TO_DATE, PAGE_SIZE, PAGE_NUMBER);
```

### ReportLatestReceived()

`ReportLatestReceived(count: number = 100): Promise<any>`

Get a report on the latest received SMS messages.

-   `count`: (optional) The number of results to return.

#### Example

```js
sms.ReportLatestReceived(COUNT);
```

### ReportTodayReceived()

`ReportTodayReceived(pageSize: number = 10, pageNumber: number = 1): Promise<any>`

Get a report on today's received SMS messages.

-   `pageSize`: (optional) The number of results to return per page.
-   `pageNumber`: (optional) The page number to return results for.

#### Example

```js
sms.ReportTodayReceived(PAGE_SIZE, PAGE_NUMBER);
```

### ReportArchivedReceived()

`ReportArchivedReceived(fromDate: number | null = null, toDate: number | null = null, pageSize: number = 10, pageNumber: number = 1): Promise<any>`

Get a report on archived received SMS messages.

-   `fromDate`: (optional) The start date to get results for (null for no start date).
-   `toDate`: (optional) The end date to get results for (null for no end date).
-   `pageSize`: (optional) The number of results to return per page.
-   `pageNumber`: (optional) The page number to return results for.

#### Example

```js
sms.ReportArchivedReceived(FROM_DATE, TO_DATE, PAGE_SIZE, PAGE_NUMBER);
```

### GetCredit()

`GetCredit(): Promise<any>`

Get the remaining credit balance for your SMS.ir account.

#### Example

```js
sms.GetCredit();
```

### GetLineNumbers()

`GetLineNumbers(): Promise<any>`

Get a list of available line numbers for your SMS.ir account.

#### Example

```js
sms.GetLineNumbers();
```

## License

Developed by [Shahab Movahhedi](https://shmovahhedi.com)

MIT Licensed.
