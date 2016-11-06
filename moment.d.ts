declare function moment(inp?: moment.MomentInput, format?: moment.MomentFormatSpecification, strict?: boolean): moment.Moment;
declare function moment(inp?: moment.MomentInput, format?: moment.MomentFormatSpecification, language?: string, strict?: boolean): moment.Moment;

// TODO(Iskren): Delete
// declare function moment(date: number): moment.Moment;
// declare function moment(date: string): moment.Moment;
// declare function moment(date: (number | string)[]): moment.Moment;
// declare function moment(date: string, format?: moment.MomentFormatSpecification, strict?: boolean): moment.Moment;
// declare function moment(date: string, format?: moment.MomentFormatSpecification, language?: string, strict?: boolean): moment.Moment;
// declare function moment(date: Date): moment.Moment;
// declare function moment(date: moment.Moment): moment.Moment;
// declare function moment(date: moment.MomentInputObject): moment.Moment;

declare namespace moment {
  // TODO(Iskren): Put all locale stuff in a namespace and export Locale and
  // LocaleSpecification (or just prefix them with the namespace.

  type RelativeTimeKey = 's' | 'm' | 'mm' | 'h' | 'hh' | 'd' | 'dd' | 'M' | 'MM' | 'y' | 'yy';
  type CalendarKey = 'sameDay' | 'nextDay' | 'lastDay' | 'nextWeek' | 'lastWeek' | 'sameElse' | string;
  type LongDateFormatKey = 'LTS' | 'LT' | 'L' | 'LL' | 'LLL' | 'LLLL' | 'lts' | 'lt' | 'l' | 'll' | 'lll' | 'llll';

  interface Locale {
    calendar(key?: CalendarKey, m?: Moment, now?: Moment): string;

    longDateFormat(key: LongDateFormatKey): string;
    invalidDate(): string;
    ordinal(n: number): string;

    preparse(inp: string): string;
    postformat(inp: string): string;
    relativeTime(n: number, withoutSuffix: boolean,
                 key: RelativeTimeKey, isFuture: boolean): string;
    pastFuture(diff: number, absRelTime: string): string;
    set(config: Object): void;

    months(): string[];
    months(m: Moment, format?: string): string;
    monthsShort(): string[];
    monthsShort(m: Moment, format?: string): string;
    monthsParse(monthName: string, format: string, strict: boolean): number;
    monthsRegex(strict: boolean): RegExp;
    monthsShortRegex(strict: boolean): RegExp;

    week(m: Moment): number;
    firstDayOfYear(): number;
    firstDayOfWeek(): number;

    weekdays(): string[];
    weekdays(m: Moment, format?: string): string;
    weekdaysMin(): string[];
    weekdaysMin(m: Moment): string;
    weekdaysShort(): string[];
    weekdaysShort(m: Moment): string;
    weekdaysParse(weekdayName: string, format: string, strict: boolean): number;
    weekdaysRegex(strict: boolean): RegExp;
    weekdaysShortRegex(strict: boolean): RegExp;
    weekdaysMinRegex(strict: boolean): RegExp;

    isPM(input: string): boolean;
    meridiem(hour: number, minute: number, isLower: boolean): string;
  }

  interface StandaloneFormatSpec {
    format: string[];
    standalone: string[];
    isFormat?: RegExp;
  }

  interface WeekSpec {
    dow: number;
    doy: number;
  }

  type CalendarSpecVal = string | ((m?: Moment, now?: Moment) => string);
  interface CalendarSpec {
    sameDay?: CalendarSpecVal;
    nextDay?: CalendarSpecVal;
    lastDay?: CalendarSpecVal;
    nextWeek?: CalendarSpecVal;
    lastWeek?: CalendarSpecVal;
    sameElse?: CalendarSpecVal;

    // any additonal properties might be used with moment.calendarFormat
    [x: string]: CalendarSpecVal;
  }

  type RelativeTimeSpecVal = (
    string |
    ((n: number, withoutSuffix: boolean,
      key: RelativeTimeKey, isFuture: boolean) => string)
  );
  type RelativeTimeFuturePastVal = string | ((relTime: string) => string);

  interface RelativeTimeSpec {
    future: RelativeTimeFuturePastVal;
    past: RelativeTimeFuturePastVal;
    s: RelativeTimeSpecVal;
    m: RelativeTimeSpecVal;
    mm: RelativeTimeSpecVal;
    h: RelativeTimeSpecVal;
    hh: RelativeTimeSpecVal;
    d: RelativeTimeSpecVal;
    dd: RelativeTimeSpecVal;
    M: RelativeTimeSpecVal;
    MM: RelativeTimeSpecVal;
    y: RelativeTimeSpecVal;
    yy: RelativeTimeSpecVal;
  }

  interface LongDateFormatSpec {
    LTS: string;
    LT: string;
    L: string;
    LL: string;
    LLL: string;
    LLLL: string;

    // lets forget for a sec that any upper/lower permutation will also work
    lts?: string;
    lt?: string;
    l?: string;
    ll?: string;
    lll?: string;
    llll?: string;
  }

  type MonthWeekdayFn = (momentToFormat: Moment, format?: string) => string;
  type WeekdaySimpleFn = (momentToFormat: Moment) => string;

  interface LocaleSpecification {
    months?: string[] | StandaloneFormatSpec | MonthWeekdayFn;
    monthsShort?: string[] | StandaloneFormatSpec | MonthWeekdayFn;

    weekdays?: string[] | StandaloneFormatSpec | MonthWeekdayFn;
    weekdaysShort?: string[] | StandaloneFormatSpec | WeekdaySimpleFn;
    weekdaysMin?: string[] | StandaloneFormatSpec | WeekdaySimpleFn;

    meridiemParse?: RegExp;
    meridiem?: (hour: number, minute:number, isLower: boolean) => string;

    isPM?: (input: string) => boolean;

    longDateFormat?: LongDateFormatSpec;
    calendar?: CalendarSpec;
    relativeTime?: RelativeTimeSpec;
    invalidDate?: string;
    ordinal?: (n: number) => string;
    ordinalParse?: RegExp;

    week?: WeekSpec;

    // Allow anything: in general any property that is passed as locale spec is
    // put in the locale object so it can be used by locale functions
    [x: string]: any;
  }

  interface MomentObjectOutput {
    years: number;
    /* One digit */
    months: number;
    /* Day of the month */
    date: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
  }

  interface Duration {
    humanize(withSuffix?: boolean): string;

    abs(): Duration;

    as(units: unitOfTime.Base): number;
    get(units: unitOfTime.Base): number;

    milliseconds(): number;
    asMilliseconds(): number;

    seconds(): number;
    asSeconds(): number;

    minutes(): number;
    asMinutes(): number;

    hours(): number;
    asHours(): number;

    days(): number;
    asDays(): number;

    weeks(): number;
    asWeeks(): number;

    months(): number;
    asMonths(): number;

    years(): number;
    asYears(): number;

    add(inp?: DurationInputArg1, unit?: DurationInputArg2): Duration;
    subtract(inp?: DurationInputArg1, unit?: DurationInputArg2): Duration;

    locale(): string;
    locale(locale: LocaleSpecifier): Duration;
    localeData(): Locale;

    toISOString(): string;
    toJSON(): string;

    // Deprecated as of 2.8.0.
    lang(locale: LocaleSpecifier): Moment;
    // Deprecated as of 2.8.0.
    lang(): Locale;
    // Deprecated
    toIsoString(): string;
  }

  interface MomentRelativeTime {
    future: any;
    past: any;
    s: any;
    m: any;
    mm: any;
    h: any;
    hh: any;
    d: any;
    dd: any;
    M: any;
    MM: any;
    y: any;
    yy: any;
  }

  interface MomentLongDateFormat {
    L: string;
    LL: string;
    LLL: string;
    LLLL: string;
    LT: string;
    LTS: string;

    l?: string;
    ll?: string;
    lll?: string;
    llll?: string;
    lt?: string;
    lts?: string;
  }

  interface MomentParsingFlags {
    empty: boolean;
    unusedTokens: string[];
    unusedInput: string[];
    overflow: number;
    charsLeftOver: number;
    nullInput: boolean;
    invalidMonth: string;
    invalidFormat: boolean;
    userInvalidated: boolean;
    iso: boolean;
    parsedDateParts: any[];
    meridiem: string;
  }

  interface MomentParsingFlagsOpt {
    empty?: boolean;
    unusedTokens?: string[];
    unusedInput?: string[];
    overflow?: number;
    charsLeftOver?: number;
    nullInput?: boolean;
    invalidMonth?: string;
    invalidFormat?: boolean;
    userInvalidated?: boolean;
    iso?: boolean;
    parsedDateParts?: any[];
    meridiem?: string;
  }

  interface MomentBuiltinFormat {
    __momentBuiltinFormatBrand: any;
  }

  type MomentFormatSpecification = string | MomentBuiltinFormat | (string | MomentBuiltinFormat)[];

  namespace unitOfTime {
    type Base = (
      "year" | "years" | "y" |
      "month" | "months" | "M" |
      "week" | "weeks" | "w" |
      "day" | "days" | "d" |
      "hour" | "hours" | "h" |
      "minute" | "minutes" | "m" |
      "second" | "seconds" | "s" |
      "millisecond" | "milliseconds" | "ms"
    );

    type _quarter = "quarter" | "quarters" | "Q";
    type _isoWeek = "isoWeek" | "isoWeeks" | "W";
    type _date = "date" | "dates" | "d";
    type DurationConstructor = Base | _quarter;

    type DurationAs = Base;

    type StartOf = Base | _quarter | _isoWeek | _date;

    type Diff = Base | _quarter;

    type MomentConstructor = Base | _date;

    type All = Base | _quarter | _isoWeek | _date |
      "weekYear" | "weekYears" | "gg" |
      "isoWeekYear" | "isoWeekYears" | "GG" |
      "dayOfYear" | "dayOfYears" | "DDD" |
      "weekday" | "weekdays" | "e" |
      "isoWeekday" | "isoWeekdays" | "E";
  }

  interface MomentInputObject {
    years?: number;
    year?: number;
    y?: number;

    months?: number;
    month?: number;
    M?: number;

    days?: number;
    day?: number;
    d?: number;

    dates?: number;
    date?: number;
    D?: number;

    hours?: number;
    hour?: number;
    h?: number;

    minutes?: number;
    minute?: number;
    m?: number;

    seconds?: number;
    second?: number;
    s?: number;

    milliseconds?: number;
    millisecond?: number;
    ms?: number;
  }

  interface DurationInputObject extends MomentInputObject {
    quarters?: number;
    quarter?: number;
    Q?: number;
  }

  interface MomentSetObject extends MomentInputObject {
    weekYears?: number;
    weekYear?: number;
    gg?: number;

    isoWeekYears?: number;
    isoWeekYear?: number;
    GG?: number;

    quarters?: number;
    quarter?: number;
    Q?: number;

    weeks?: number;
    week?: number;
    w?: number;

    isoWeeks?: number;
    isoWeek?: number;
    W?: number;

    dayOfYears?: number;
    dayOfYear?: number;
    DDD?: number;

    weekdays?: number;
    weekday?: number;
    e?: number;

    isoWeekdays?: number;
    isoWeekday?: number;
    E?: number;
  }

  interface FromTo {
    from: MomentInput;
    to: MomentInput;
  }

  type MomentInput = Moment | Date | string | number | (number | string)[] | MomentInputObject;
  type DurationInputArg1 = Duration | number | string | FromTo | DurationInputObject;
  type DurationInputArg2 = unitOfTime.DurationConstructor;
  type LocaleSpecifier = string | Moment | Duration | string[];

  interface MomentCreationData {
    input: string;
    format: string;
    locale: Locale;
    isUTC: boolean;
    strict: boolean;
  }

  interface Moment {
    format(format?: string): string;

    startOf(unitOfTime: unitOfTime.StartOf): Moment;
    endOf(unitOfTime: unitOfTime.StartOf): Moment;

    // /**
    // * Mutates the original moment by adding time. (deprecated in 2.8.0)
    // *
    // * @param unitOfTime the unit of time you want to add (eg "years" / "hours" etc)
    // * @param amount the amount you want to add
    // */
    // add(unitOfTime: UnitOfTime, amount: number): Moment;
    // /**
    // * Mutates the original moment by adding time.
    // *
    // * @param amount the amount you want to add
    // * @param unitOfTime the unit of time you want to add (eg "years" / "hours" etc)
    // */
    // add(amount: number, unitOfTime: UnitOfTime): Moment;
    // /**
    // * Mutates the original moment by adding time. Note that the order of arguments can be flipped.
    // *
    // * @param amount the amount you want to add
    // * @param unitOfTime the unit of time you want to add (eg "years" / "hours" etc)
    // */
    // add(amount: string, unitOfTime: UnitOfTime): Moment;
    // /**
    // * Mutates the original moment by adding time.
    // *
    // * @param objectLiteral an object literal that describes multiple time units {days:7,months:1}
    // */
    // add(objectLiteral: MomentInput): Moment;
    // /**
    // * Mutates the original moment by adding time.
    // *
    // * @param duration a length of time
    // */
    // add(duration: Duration): Moment;

    add(amount?: DurationInputArg1, unit?: DurationInputArg2): Moment;
    /**
     * deprecated: reversed syntax
     */
    add(unit: unitOfTime.DurationConstructor, amount: number|string): Moment;


    // /**
    // * Mutates the original moment by subtracting time. (deprecated in 2.8.0)
    // *
    // * @param unitOfTime the unit of time you want to subtract (eg "years" / "hours" etc)
    // * @param amount the amount you want to subtract
    // */
    // subtract(unitOfTime: UnitOfTime, amount: number): Moment;
    // /**
    // * Mutates the original moment by subtracting time.
    // *
    // * @param unitOfTime the unit of time you want to subtract (eg "years" / "hours" etc)
    // * @param amount the amount you want to subtract
    // */
    // subtract(amount: number, unitOfTime: UnitOfTime): Moment;
    // /**
    // * Mutates the original moment by subtracting time. Note that the order of arguments can be flipped.
    // *
    // * @param amount the amount you want to add
    // * @param unitOfTime the unit of time you want to subtract (eg "years" / "hours" etc)
    // */
    // subtract(amount: string, unitOfTime: UnitOfTime): Moment;
    // /**
    // * Mutates the original moment by subtracting time.
    // *
    // * @param objectLiteral an object literal that describes multiple time units {days:7,months:1}
    // */
    // subtract(objectLiteral: MomentInput): Moment;
    // /**
    // * Mutates the original moment by subtracting time.
    // *
    // * @param duration a length of time
    // */
    // subtract(duration: Duration): Moment;
    subtract(amount?: DurationInputArg1, unit?: DurationInputArg2): Moment;
    /**
     * deprecated: reversed syntax
     */
    subtract(unit: unitOfTime.DurationConstructor, amount: number|string): Moment;

    calendar(time?: MomentInput, formats?: CalendarSpec): string;

    clone(): Moment;

    /**
    * @return Unix timestamp, or milliseconds since the epoch.
    */
    valueOf(): number;

    // current date/time in local mode
    local(keepLocalTime?: boolean): Moment;
    isLocal(): boolean;

    // current date/time in UTC mode
    utc(keepLocalTime?: boolean): Moment;
    isUTC(): boolean;
    // deprecated
    isUtc(): boolean;

    parseZone(): Moment;
    isValid(): boolean;
    invalidAt(): number;

    hasAlignedHourOffset(other?: MomentInput): boolean;

    creationData(): MomentCreationData;
    parsingFlags(): MomentParsingFlags;

    year(y: number): Moment;
    year(): number;
    // deprecated
    years(y: number): Moment;
    // deprecated
    years(): number;
    quarter(): number;
    quarter(q: number): Moment;
    quarters(): number;
    quarters(q: number): Moment;
    month(M: number|string): Moment;
    month(): number;
    // deprecated
    months(M: number|string): Moment;
    // deprecated
    months(): number;
    day(d: number|string): Moment;
    day(): number;
    days(d: number|string): Moment;
    days(): number;
    date(d: number): Moment;
    date(): number;
    // deprecated
    dates(d: number): Moment;
    // deprecated
    dates(): number;
    hour(h: number): Moment;
    hour(): number;
    hours(h: number): Moment;
    hours(): number;
    minute(m: number): Moment;
    minute(): number;
    minutes(m: number): Moment;
    minutes(): number;
    second(s: number): Moment;
    second(): number;
    seconds(s: number): Moment;
    seconds(): number;
    millisecond(ms: number): Moment;
    millisecond(): number;
    milliseconds(ms: number): Moment;
    milliseconds(): number;
    weekday(): number;
    weekday(d: number): Moment;
    isoWeekday(): number;
    isoWeekday(d: number|string): Moment;
    weekYear(): number;
    weekYear(d: number): Moment;
    isoWeekYear(): number;
    isoWeekYear(d: number): Moment;
    week(): number;
    week(d: number): Moment;
    weeks(): number;
    weeks(d: number): Moment;
    isoWeek(): number;
    isoWeek(d: number): Moment;
    isoWeeks(): number;
    isoWeeks(d: number): Moment;
    weeksInYear(): number;
    isoWeeksInYear(): number;
    dayOfYear(): number;
    dayOfYear(d: number): Moment;

    from(inp: MomentInput, suffix?: boolean): string;
    to(inp: MomentInput, suffix?: boolean): string;
    fromNow(withoutSuffix?: boolean): string;
    toNow(withoutPrefix?: boolean): string;

    diff(b: MomentInput, unitOfTime?: unitOfTime.Diff, precise?: boolean): number;

    toArray(): number[];
    toDate(): Date;
    toISOString(): string;
    toJSON(): string;
    unix(): number;

    isLeapYear(): boolean;
    /**
     * deprecated in favor of utcOffset
     */
    zone(): number;
    zone(b: number|string): Moment;
    utcOffset(): number;
    utcOffset(b: number|string, keepLocalTime?: boolean): Moment;
    isUTCOffset(): boolean;
    daysInMonth(): number;
    isDST(): boolean;

    zoneAbbr(): string;
    zoneName(): string;

    isBefore(inp?: MomentInput, granularity?: unitOfTime.StartOf): boolean;
    isAfter(inp?: MomentInput, granularity?: unitOfTime.StartOf): boolean;
    isSame(inp?: MomentInput, granularity?: unitOfTime.StartOf): boolean;
    isSameOrAfter(inp?: MomentInput, granularity?: unitOfTime.StartOf): boolean;
    isSameOrBefore(inp?: MomentInput, granularity?: unitOfTime.StartOf): boolean;
    isBetween(a: MomentInput, b: MomentInput, granularity?: unitOfTime.StartOf, inclusivity?: "()" | "[)" | "(]" | "[]"): boolean;

    // Deprecated as of 2.8.0.
    lang(language: LocaleSpecifier): Moment;
    // Deprecated as of 2.8.0.
    lang(): Locale;

    locale(): string;
    locale(locale: LocaleSpecifier): Moment;

    localeData(): Locale;

    // deprecated
    isDSTShifted(): boolean;

    // Deprecated as of 2.7.0.
    // NOTE(constructor): Same as moment constructor
    max(inp?: MomentInput, format?: MomentFormatSpecification, strict?: boolean): Moment;
    max(inp?: MomentInput, format?: MomentFormatSpecification, language?: string, strict?: boolean): Moment;

    // Deprecated as of 2.7.0.
    // NOTE(constructor): Same as moment constructor
    min(inp?: MomentInput, format?: MomentFormatSpecification, strict?: boolean): Moment;
    min(inp?: MomentInput, format?: MomentFormatSpecification, language?: string, strict?: boolean): Moment;

    get(unit: unitOfTime.All): number;
    set(unit: unitOfTime.All, value: number): Moment;
    set(objectLiteral: MomentSetObject): Moment;

    /*This returns an object containing year, month, day-of-month, hour, minute, seconds, milliseconds.*/
    //Works with version 2.10.5+
    toObject(): MomentObjectOutput;
  }

  export var version: string;
  export var fn: Moment;

  // NOTE(constructor): Same as moment constructor
  export function utc(inp?: MomentInput, format?: MomentFormatSpecification, strict?: boolean): Moment;
  export function utc(inp?: MomentInput, format?: MomentFormatSpecification, language?: string, strict?: boolean): Moment;
  // export function utc(): Moment;
  // export function utc(date: number): Moment;
  // export function utc(date: number[]): Moment;
  // export function utc(date: string, format?: string, strict?: boolean): Moment;
  // export function utc(date: string, format?: string, language?: string, strict?: boolean): Moment;
  // export function utc(date: string, formats: string[], strict?: boolean): Moment;
  // export function utc(date: string, formats: string[], language?: string, strict?: boolean): Moment;
  // export function utc(date: Date): Moment;
  // export function utc(date: Moment): Moment;
  // export function utc(date: Object): Moment;

  export function unix(timestamp: number): Moment;

  export function invalid(flags?: MomentParsingFlagsOpt): Moment;
  export function isMoment(m: any): m is Moment;
  export function isDate(m: any): m is Date;
  export function isDuration(d: any): d is Duration;

  // Deprecated in 2.8.0.
  export function lang(language?: string): string;
  export function lang(language?: string, definition?: Locale): string;

  export function locale(language?: string): string;
  export function locale(language?: string[]): string;
  export function locale(language?: string, definition?: LocaleSpecification): string;

  export function localeData(key?: string | string[]): Locale;

  export function updateLocale(language: string, locale: LocaleSpecification): Locale;

  export function duration(inp?: DurationInputArg1, unit?: DurationInputArg2): Duration;

  // export function duration(milliseconds: Number): Duration;
  // export function duration(num: Number, unitOfTime: UnitOfTime): Duration;
  // export function duration(input: MomentInput): Duration;
  // export function duration(object: any): Duration;
  // export function duration(): Duration;

  // NOTE(constructor): Same as moment constructor
  export function parseZone(inp?: MomentInput, format?: MomentFormatSpecification, strict?: boolean): Moment;
  export function parseZone(inp?: MomentInput, format?: MomentFormatSpecification, language?: string, strict?: boolean): Moment;

  export function months(): string[];
  export function months(index: number): string;
  export function months(format: string): string[];
  export function months(format: string, index: number): string;
  export function monthsShort(): string[];
  export function monthsShort(index: number): string;
  export function monthsShort(format: string): string[];
  export function monthsShort(format: string, index: number): string;

  export function weekdays(): string[];
  export function weekdays(index: number): string;
  export function weekdays(format: string): string[];
  export function weekdays(format: string, index: number): string;
  export function weekdays(localeSorted: boolean): string[];
  export function weekdays(localeSorted: boolean, index: number): string;
  export function weekdays(localeSorted: boolean, format: string): string[];
  export function weekdays(localeSorted: boolean, format: string, index: number): string;
  export function weekdaysShort(): string[];
  export function weekdaysShort(index: number): string;
  export function weekdaysShort(format: string): string[];
  export function weekdaysShort(format: string, index: number): string;
  export function weekdaysShort(localeSorted: boolean): string[];
  export function weekdaysShort(localeSorted: boolean, index: number): string;
  export function weekdaysShort(localeSorted: boolean, format: string): string[];
  export function weekdaysShort(localeSorted: boolean, format: string, index: number): string;
  export function weekdaysMin(): string[];
  export function weekdaysMin(index: number): string;
  export function weekdaysMin(format: string): string[];
  export function weekdaysMin(format: string, index: number): string;
  export function weekdaysMin(localeSorted: boolean): string[];
  export function weekdaysMin(localeSorted: boolean, index: number): string;
  export function weekdaysMin(localeSorted: boolean, format: string): string[];
  export function weekdaysMin(localeSorted: boolean, format: string, index: number): string;

  export function min(...moments: MomentInput[]): Moment;
  export function max(...moments: MomentInput[]): Moment;

  /**
   * Returns the current time in milliseconds since epoch. Overwrite for
   * profit.
   */
  export function now(): number;

  export function defineLocale(language: string, localeSpec: LocaleSpecification): Locale;
  export function updateLocale(language: string, localeSpec: LocaleSpecification): Locale;

  export function locales(): string[];

  export function normalizeUnits(unit: unitOfTime.All): string;
  export function relativeTimeThreshold(threshold: string): number | boolean;
  export function relativeTimeThreshold(threshold: string, limit: number): boolean;
  export function relativeTimeRounding(fn: (num: number) => number): boolean;
  export function relativeTimeRounding(): (num: number) => number;
  export function calendarFormat(m: Moment, now: Moment): string;

  /**
  * Constant used to enable explicit ISO_8601 format parsing.
  */
  export var ISO_8601: MomentBuiltinFormat;

  export var defaultFormat: string;
  export var defaultFormatUtc: string;
}

declare module "moment" { export = moment; }
