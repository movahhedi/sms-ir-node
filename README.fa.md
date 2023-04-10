# SMS.IR API

ماژول `sms-ir-api` به شما اجازه می‌دهد تا با API SMS.IR برای ارسال و دریافت پیامک ارتباط برقرار کنید. API key و شماره خط پیش‌فرض برای حساب SMS.IR شما برای ایجاد یک نمونه جدید از کلاس Smsir لازم است.

## نصب

این بسته در npm به نام `sms-ir-api` در دسترس است. شما می‌توانید آن را با استفاده از npm یا yarn نصب کنید.

با npm:

```bash
npm install sms-ir-api
```

با yarn:

```bash
yarn add sms-ir-api
```

## استفاده

برای استفاده از این کلاس در کد JavaScript یا TypeScript خود، ابتدا آن را وارد کنید:

```javascript
import { Smsir } from "sms-ir-api";
```

سپس یک نمونه جدید از کلاس Smsir با استفاده از API key و شماره خط پیش‌فرض حساب SMS.IR خود بسازید:

```javascript
const sms = new Smsir("YOUR_API_KEY", YOUR_LINE_NUMBER);
```

شما می‌توانید سپس از متدهای کلاس Smsir برای تعامل با API SMS.IR استفاده کنید. به عنوان مثال، برای ارسال یک پیامک تک به گیرنده تک:

```javascript
sms.Send("Hello World!", "RECIPIENT_MOBILE_NUMBER");
```

## متدها

متدهای زیر در کلاس Smsir در دسترس هستند:

### `constructor()`

`constructor(apiKey: string, lineNumber: number)`

ایجاد یک نمونه جدید از کلاس Smsir.

-   `apiKey`: API key برای حساب SMS.IR شما.
-   `lineNumber`: شماره خط پیش فرض برای ارسال پیام ها.

### `Send()`

`Send(MessageText: string, Mobile: string, SendDateTime: number | null = null, lineNumber: number = this.DefaultLineNumber): Promise<any>`

ارسال یک پیامک تک به گیرنده تک.

-   `MessageText`: متن پیام برای ارسال.
-   `Mobile`: شماره موبایل گیرنده.
-   `SendDateTime`: (اختیاری) برچسب زمان Unix برای زمان ارسال پیام (null برای ارسال فوری).
-   `lineNumber`: (اختیاری) شماره خط برای ارسال پیام.

### `SendBulk()`

`SendBulk(MessageText: string, Mobiles: Array<string>, SendDateTime: number | null = null, lineNumber: number = this.DefaultLineNumber): Promise<any>`

ارسال یک پیامک تک به گیرندگان چندگانه.

-   `MessageText`: متن پیام برای ارسال.
-   `Mobiles`: آرایه‌ای از شماره‌های موبایل گیرندگان.
-   `SendDateTime`: (اختیاری) برچسب زمان Unix برای زمان ارسال پیام (null برای ارسال فوری).
-   `lineNumber`: (اختیاری) شماره خط برای ارسال پیام.

### `SendLikeToLike()`

`SendLikeToLike(MessageTexts: string, Mobiles: Array<string>, SendDateTime: number | null = null, lineNumber: number | null = null): Promise<any>`

ارسال پیامک‌های چندگانه به گیرندگان چندگانه (یک پیام در هر گیرنده).

-   `MessageTexts`: متن پیام‌ها برای ارسال.
-   `Mobiles`: آرایه‌ای از شماره‌های موبایل گیرندگان.
-   `SendDateTime`: (اختیاری) برچسب زمان Unix برای زمان ارسال پیام (null برای ارسال فوری).
-   `lineNumber`: (اختیاری) شماره خط برای ارسال پیام (null برای شماره خط پیش فرض).

### `DeleteScheduled()`

`DeleteScheduled(PackId: number): Promise<any>`

حذف یک پیامک زمانبندی شده.

-   `PackId`: شناسه بسته پیام زمانبندی شده برای حذف.

### `SendVerifyCode()`

`SendVerifyCode(Mobile: string, TemplateId: number, Parameters: Array<any>): Promise<any>`

ارسال یک کد تأیید از طریق از طریق پیامک.

-   `Mobile`: شماره موبایل گیرنده.
-   `TemplateId`: شناسه قالب کد تأیید برای استفاده.
-   `Parameters`: آرایه‌ای از پارامترها برای استفاده در قالب کد تأیید.

### `ReportMessage()`

`ReportMessage(MessageId: number): Promise<any>`

گزارش دریافت یک پیامک ارسال شده خاص.

-   `MessageId`: شناسه پیام ارسال شده برای دریافت گزارش.

### `ReportPack()`

`ReportPack(PackId: number): Promise<any>`

گزارش دریافت یک بسته پیام ارسال شده خاص.

-   `PackId`: شناسه بسته پیام ارسال شده برای دریافت گزارش.

### `ReportToday()`

`ReportToday(pageSize: number = 10, pageNumber: number = 1): Promise<any>`

گزارش دریافت پیامک‌های ارسال شده امروز.

-   `pageSize`: (اختیاری) تعداد نتایج برای بازگشت در هر صفحه.
-   `pageNumber`: (اختیاری) شماره صفحه برای بازگشت نتایج.

### `ReportArchived()`

`ReportArchived(fromDate: null = null, toDate: null = null, pageSize: number = 10, pageNumber: number = 1): Promise<any>`

گزارش دریافت پیامک‌های ارسال شده بایگانی شده.

-   `fromDate`: (اختیاری) تاریخ شروع برای دریافت نتایج (null برای بدون تاریخ شروع).
-   `toDate`: (اختیاری) تاریخ پایان برای دریافت نتایج (null برای بدون تاریخ پایان).
-   `pageSize`: (اختیاری) تعداد نتایج برای بازگشت در هر صفحه.
-   `pageNumber`: (اختیاری) شماره صفحه برای بازگشت نتایج.

### `ReportLatestReceived()`

`ReportLatestReceived(count: number = 100): Promise<any>`

گزارش دریافت پیامک‌های دریافتی جدیدترین.

-   `count`: (اختیاری) تعداد نتایج برای بازگشت.

### `ReportTodayReceived()`

`ReportTodayReceived(pageSize: number = 10, pageNumber: number = 1): Promise<any>`

گزارش دریافت پیامک‌های دریافتی امروز.

-   `pageSize`: (اختیاری) تعداد نتایج برای بازگشت در هر صفحه.
-   `pageNumber`: (اختیاری) شماره صفحه برای بازگشت نتایج.

### `ReportArchivedReceived()`

`ReportArchivedReceived(fromDate: null = null, toDate: null = null, pageSize: number = 10, pageNumber: number = 1): Promise<any>`

گزارش دریافت پیامک‌های دریافتی بایگانی شده.

-   `fromDate`: (اختیاری) تاریخ شروع برای دریافت نتایج (null برای بدون تاریخ شروع).
-   `toDate`: (اختیاری) تاریخ پایان برای دریافت نتایج (null برای بدون تاریخ پایان).
-   `pageSize`: (اختیاری) تعداد نتایج برای بازگشت در هر صفحه.
-   `pageNumber`: (اختیاری) شماره صفحه برای بازگشت نتایج.

### `GetCredit()`

`GetCredit(): Promise<any>`

دریافت مانده اعتبار حساب SMS.IR شما.

### `GetLineNumbers()`

`GetLineNumbers(): Promise<any>`

دریافت لیست شماره‌های خط موجود برای حساب SMS.IR شما.

## توسعه و ليسانس

توسعه یافته توسط [شهاب الدّین موحّدی](https://shmovahhedi.com)

تحت لیسانس MIT
