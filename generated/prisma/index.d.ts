
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Employer
 * 
 */
export type Employer = $Result.DefaultSelection<Prisma.$EmployerPayload>
/**
 * Model JobApplication
 * 
 */
export type JobApplication = $Result.DefaultSelection<Prisma.$JobApplicationPayload>
/**
 * Model JobListing
 * 
 */
export type JobListing = $Result.DefaultSelection<Prisma.$JobListingPayload>
/**
 * Model JobRequiredSkill
 * 
 */
export type JobRequiredSkill = $Result.DefaultSelection<Prisma.$JobRequiredSkillPayload>
/**
 * Model JobSeeker
 * 
 */
export type JobSeeker = $Result.DefaultSelection<Prisma.$JobSeekerPayload>
/**
 * Model JobSeekerSkill
 * 
 */
export type JobSeekerSkill = $Result.DefaultSelection<Prisma.$JobSeekerSkillPayload>
/**
 * Model SavedJob
 * 
 */
export type SavedJob = $Result.DefaultSelection<Prisma.$SavedJobPayload>
/**
 * Model Skill
 * 
 */
export type Skill = $Result.DefaultSelection<Prisma.$SkillPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Employers
 * const employers = await prisma.employer.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Employers
   * const employers = await prisma.employer.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.employer`: Exposes CRUD operations for the **Employer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employers
    * const employers = await prisma.employer.findMany()
    * ```
    */
  get employer(): Prisma.EmployerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jobApplication`: Exposes CRUD operations for the **JobApplication** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JobApplications
    * const jobApplications = await prisma.jobApplication.findMany()
    * ```
    */
  get jobApplication(): Prisma.JobApplicationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jobListing`: Exposes CRUD operations for the **JobListing** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JobListings
    * const jobListings = await prisma.jobListing.findMany()
    * ```
    */
  get jobListing(): Prisma.JobListingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jobRequiredSkill`: Exposes CRUD operations for the **JobRequiredSkill** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JobRequiredSkills
    * const jobRequiredSkills = await prisma.jobRequiredSkill.findMany()
    * ```
    */
  get jobRequiredSkill(): Prisma.JobRequiredSkillDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jobSeeker`: Exposes CRUD operations for the **JobSeeker** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JobSeekers
    * const jobSeekers = await prisma.jobSeeker.findMany()
    * ```
    */
  get jobSeeker(): Prisma.JobSeekerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jobSeekerSkill`: Exposes CRUD operations for the **JobSeekerSkill** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JobSeekerSkills
    * const jobSeekerSkills = await prisma.jobSeekerSkill.findMany()
    * ```
    */
  get jobSeekerSkill(): Prisma.JobSeekerSkillDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.savedJob`: Exposes CRUD operations for the **SavedJob** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SavedJobs
    * const savedJobs = await prisma.savedJob.findMany()
    * ```
    */
  get savedJob(): Prisma.SavedJobDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.skill`: Exposes CRUD operations for the **Skill** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Skills
    * const skills = await prisma.skill.findMany()
    * ```
    */
  get skill(): Prisma.SkillDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.1
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Employer: 'Employer',
    JobApplication: 'JobApplication',
    JobListing: 'JobListing',
    JobRequiredSkill: 'JobRequiredSkill',
    JobSeeker: 'JobSeeker',
    JobSeekerSkill: 'JobSeekerSkill',
    SavedJob: 'SavedJob',
    Skill: 'Skill',
    User: 'User'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "employer" | "jobApplication" | "jobListing" | "jobRequiredSkill" | "jobSeeker" | "jobSeekerSkill" | "savedJob" | "skill" | "user"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Employer: {
        payload: Prisma.$EmployerPayload<ExtArgs>
        fields: Prisma.EmployerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload>
          }
          findFirst: {
            args: Prisma.EmployerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload>
          }
          findMany: {
            args: Prisma.EmployerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload>[]
          }
          create: {
            args: Prisma.EmployerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload>
          }
          createMany: {
            args: Prisma.EmployerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EmployerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload>
          }
          update: {
            args: Prisma.EmployerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload>
          }
          deleteMany: {
            args: Prisma.EmployerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmployerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EmployerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmployerPayload>
          }
          aggregate: {
            args: Prisma.EmployerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmployer>
          }
          groupBy: {
            args: Prisma.EmployerGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmployerGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployerCountArgs<ExtArgs>
            result: $Utils.Optional<EmployerCountAggregateOutputType> | number
          }
        }
      }
      JobApplication: {
        payload: Prisma.$JobApplicationPayload<ExtArgs>
        fields: Prisma.JobApplicationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobApplicationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobApplicationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload>
          }
          findFirst: {
            args: Prisma.JobApplicationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobApplicationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload>
          }
          findMany: {
            args: Prisma.JobApplicationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload>[]
          }
          create: {
            args: Prisma.JobApplicationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload>
          }
          createMany: {
            args: Prisma.JobApplicationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.JobApplicationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload>
          }
          update: {
            args: Prisma.JobApplicationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload>
          }
          deleteMany: {
            args: Prisma.JobApplicationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobApplicationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.JobApplicationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobApplicationPayload>
          }
          aggregate: {
            args: Prisma.JobApplicationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJobApplication>
          }
          groupBy: {
            args: Prisma.JobApplicationGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobApplicationGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobApplicationCountArgs<ExtArgs>
            result: $Utils.Optional<JobApplicationCountAggregateOutputType> | number
          }
        }
      }
      JobListing: {
        payload: Prisma.$JobListingPayload<ExtArgs>
        fields: Prisma.JobListingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobListingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobListingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobListingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobListingPayload>
          }
          findFirst: {
            args: Prisma.JobListingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobListingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobListingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobListingPayload>
          }
          findMany: {
            args: Prisma.JobListingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobListingPayload>[]
          }
          create: {
            args: Prisma.JobListingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobListingPayload>
          }
          createMany: {
            args: Prisma.JobListingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.JobListingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobListingPayload>
          }
          update: {
            args: Prisma.JobListingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobListingPayload>
          }
          deleteMany: {
            args: Prisma.JobListingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobListingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.JobListingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobListingPayload>
          }
          aggregate: {
            args: Prisma.JobListingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJobListing>
          }
          groupBy: {
            args: Prisma.JobListingGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobListingGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobListingCountArgs<ExtArgs>
            result: $Utils.Optional<JobListingCountAggregateOutputType> | number
          }
        }
      }
      JobRequiredSkill: {
        payload: Prisma.$JobRequiredSkillPayload<ExtArgs>
        fields: Prisma.JobRequiredSkillFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobRequiredSkillFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRequiredSkillPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobRequiredSkillFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRequiredSkillPayload>
          }
          findFirst: {
            args: Prisma.JobRequiredSkillFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRequiredSkillPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobRequiredSkillFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRequiredSkillPayload>
          }
          findMany: {
            args: Prisma.JobRequiredSkillFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRequiredSkillPayload>[]
          }
          create: {
            args: Prisma.JobRequiredSkillCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRequiredSkillPayload>
          }
          createMany: {
            args: Prisma.JobRequiredSkillCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.JobRequiredSkillDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRequiredSkillPayload>
          }
          update: {
            args: Prisma.JobRequiredSkillUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRequiredSkillPayload>
          }
          deleteMany: {
            args: Prisma.JobRequiredSkillDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobRequiredSkillUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.JobRequiredSkillUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobRequiredSkillPayload>
          }
          aggregate: {
            args: Prisma.JobRequiredSkillAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJobRequiredSkill>
          }
          groupBy: {
            args: Prisma.JobRequiredSkillGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobRequiredSkillGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobRequiredSkillCountArgs<ExtArgs>
            result: $Utils.Optional<JobRequiredSkillCountAggregateOutputType> | number
          }
        }
      }
      JobSeeker: {
        payload: Prisma.$JobSeekerPayload<ExtArgs>
        fields: Prisma.JobSeekerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobSeekerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSeekerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobSeekerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSeekerPayload>
          }
          findFirst: {
            args: Prisma.JobSeekerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSeekerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobSeekerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSeekerPayload>
          }
          findMany: {
            args: Prisma.JobSeekerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSeekerPayload>[]
          }
          create: {
            args: Prisma.JobSeekerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSeekerPayload>
          }
          createMany: {
            args: Prisma.JobSeekerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.JobSeekerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSeekerPayload>
          }
          update: {
            args: Prisma.JobSeekerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSeekerPayload>
          }
          deleteMany: {
            args: Prisma.JobSeekerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobSeekerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.JobSeekerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSeekerPayload>
          }
          aggregate: {
            args: Prisma.JobSeekerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJobSeeker>
          }
          groupBy: {
            args: Prisma.JobSeekerGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobSeekerGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobSeekerCountArgs<ExtArgs>
            result: $Utils.Optional<JobSeekerCountAggregateOutputType> | number
          }
        }
      }
      JobSeekerSkill: {
        payload: Prisma.$JobSeekerSkillPayload<ExtArgs>
        fields: Prisma.JobSeekerSkillFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobSeekerSkillFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSeekerSkillPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobSeekerSkillFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSeekerSkillPayload>
          }
          findFirst: {
            args: Prisma.JobSeekerSkillFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSeekerSkillPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobSeekerSkillFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSeekerSkillPayload>
          }
          findMany: {
            args: Prisma.JobSeekerSkillFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSeekerSkillPayload>[]
          }
          create: {
            args: Prisma.JobSeekerSkillCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSeekerSkillPayload>
          }
          createMany: {
            args: Prisma.JobSeekerSkillCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.JobSeekerSkillDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSeekerSkillPayload>
          }
          update: {
            args: Prisma.JobSeekerSkillUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSeekerSkillPayload>
          }
          deleteMany: {
            args: Prisma.JobSeekerSkillDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobSeekerSkillUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.JobSeekerSkillUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobSeekerSkillPayload>
          }
          aggregate: {
            args: Prisma.JobSeekerSkillAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJobSeekerSkill>
          }
          groupBy: {
            args: Prisma.JobSeekerSkillGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobSeekerSkillGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobSeekerSkillCountArgs<ExtArgs>
            result: $Utils.Optional<JobSeekerSkillCountAggregateOutputType> | number
          }
        }
      }
      SavedJob: {
        payload: Prisma.$SavedJobPayload<ExtArgs>
        fields: Prisma.SavedJobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SavedJobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedJobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SavedJobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedJobPayload>
          }
          findFirst: {
            args: Prisma.SavedJobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedJobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SavedJobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedJobPayload>
          }
          findMany: {
            args: Prisma.SavedJobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedJobPayload>[]
          }
          create: {
            args: Prisma.SavedJobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedJobPayload>
          }
          createMany: {
            args: Prisma.SavedJobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SavedJobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedJobPayload>
          }
          update: {
            args: Prisma.SavedJobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedJobPayload>
          }
          deleteMany: {
            args: Prisma.SavedJobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SavedJobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SavedJobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedJobPayload>
          }
          aggregate: {
            args: Prisma.SavedJobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSavedJob>
          }
          groupBy: {
            args: Prisma.SavedJobGroupByArgs<ExtArgs>
            result: $Utils.Optional<SavedJobGroupByOutputType>[]
          }
          count: {
            args: Prisma.SavedJobCountArgs<ExtArgs>
            result: $Utils.Optional<SavedJobCountAggregateOutputType> | number
          }
        }
      }
      Skill: {
        payload: Prisma.$SkillPayload<ExtArgs>
        fields: Prisma.SkillFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SkillFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SkillFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          findFirst: {
            args: Prisma.SkillFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SkillFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          findMany: {
            args: Prisma.SkillFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>[]
          }
          create: {
            args: Prisma.SkillCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          createMany: {
            args: Prisma.SkillCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SkillDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          update: {
            args: Prisma.SkillUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          deleteMany: {
            args: Prisma.SkillDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SkillUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SkillUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SkillPayload>
          }
          aggregate: {
            args: Prisma.SkillAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSkill>
          }
          groupBy: {
            args: Prisma.SkillGroupByArgs<ExtArgs>
            result: $Utils.Optional<SkillGroupByOutputType>[]
          }
          count: {
            args: Prisma.SkillCountArgs<ExtArgs>
            result: $Utils.Optional<SkillCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    employer?: EmployerOmit
    jobApplication?: JobApplicationOmit
    jobListing?: JobListingOmit
    jobRequiredSkill?: JobRequiredSkillOmit
    jobSeeker?: JobSeekerOmit
    jobSeekerSkill?: JobSeekerSkillOmit
    savedJob?: SavedJobOmit
    skill?: SkillOmit
    user?: UserOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type EmployerCountOutputType
   */

  export type EmployerCountOutputType = {
    job_listings: number
    applications: number
  }

  export type EmployerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job_listings?: boolean | EmployerCountOutputTypeCountJob_listingsArgs
    applications?: boolean | EmployerCountOutputTypeCountApplicationsArgs
  }

  // Custom InputTypes
  /**
   * EmployerCountOutputType without action
   */
  export type EmployerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmployerCountOutputType
     */
    select?: EmployerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EmployerCountOutputType without action
   */
  export type EmployerCountOutputTypeCountJob_listingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobListingWhereInput
  }

  /**
   * EmployerCountOutputType without action
   */
  export type EmployerCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobApplicationWhereInput
  }


  /**
   * Count Type JobListingCountOutputType
   */

  export type JobListingCountOutputType = {
    applications: number
    required_skills: number
  }

  export type JobListingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | JobListingCountOutputTypeCountApplicationsArgs
    required_skills?: boolean | JobListingCountOutputTypeCountRequired_skillsArgs
  }

  // Custom InputTypes
  /**
   * JobListingCountOutputType without action
   */
  export type JobListingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobListingCountOutputType
     */
    select?: JobListingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * JobListingCountOutputType without action
   */
  export type JobListingCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobApplicationWhereInput
  }

  /**
   * JobListingCountOutputType without action
   */
  export type JobListingCountOutputTypeCountRequired_skillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobRequiredSkillWhereInput
  }


  /**
   * Count Type JobSeekerCountOutputType
   */

  export type JobSeekerCountOutputType = {
    applications: number
    skills: number
  }

  export type JobSeekerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | JobSeekerCountOutputTypeCountApplicationsArgs
    skills?: boolean | JobSeekerCountOutputTypeCountSkillsArgs
  }

  // Custom InputTypes
  /**
   * JobSeekerCountOutputType without action
   */
  export type JobSeekerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeekerCountOutputType
     */
    select?: JobSeekerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * JobSeekerCountOutputType without action
   */
  export type JobSeekerCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobApplicationWhereInput
  }

  /**
   * JobSeekerCountOutputType without action
   */
  export type JobSeekerCountOutputTypeCountSkillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobSeekerSkillWhereInput
  }


  /**
   * Count Type SkillCountOutputType
   */

  export type SkillCountOutputType = {
    seeker_skills: number
    job_required_skills: number
  }

  export type SkillCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seeker_skills?: boolean | SkillCountOutputTypeCountSeeker_skillsArgs
    job_required_skills?: boolean | SkillCountOutputTypeCountJob_required_skillsArgs
  }

  // Custom InputTypes
  /**
   * SkillCountOutputType without action
   */
  export type SkillCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillCountOutputType
     */
    select?: SkillCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SkillCountOutputType without action
   */
  export type SkillCountOutputTypeCountSeeker_skillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobSeekerSkillWhereInput
  }

  /**
   * SkillCountOutputType without action
   */
  export type SkillCountOutputTypeCountJob_required_skillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobRequiredSkillWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Employer
   */

  export type AggregateEmployer = {
    _count: EmployerCountAggregateOutputType | null
    _avg: EmployerAvgAggregateOutputType | null
    _sum: EmployerSumAggregateOutputType | null
    _min: EmployerMinAggregateOutputType | null
    _max: EmployerMaxAggregateOutputType | null
  }

  export type EmployerAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    founded_year: number | null
  }

  export type EmployerSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    founded_year: number | null
  }

  export type EmployerMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    company_name: string | null
    company_description: string | null
    industry: string | null
    company_size: string | null
    website_url: string | null
    logo_path: string | null
    founded_year: number | null
  }

  export type EmployerMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    company_name: string | null
    company_description: string | null
    industry: string | null
    company_size: string | null
    website_url: string | null
    logo_path: string | null
    founded_year: number | null
  }

  export type EmployerCountAggregateOutputType = {
    id: number
    user_id: number
    company_name: number
    company_description: number
    industry: number
    company_size: number
    website_url: number
    logo_path: number
    founded_year: number
    _all: number
  }


  export type EmployerAvgAggregateInputType = {
    id?: true
    user_id?: true
    founded_year?: true
  }

  export type EmployerSumAggregateInputType = {
    id?: true
    user_id?: true
    founded_year?: true
  }

  export type EmployerMinAggregateInputType = {
    id?: true
    user_id?: true
    company_name?: true
    company_description?: true
    industry?: true
    company_size?: true
    website_url?: true
    logo_path?: true
    founded_year?: true
  }

  export type EmployerMaxAggregateInputType = {
    id?: true
    user_id?: true
    company_name?: true
    company_description?: true
    industry?: true
    company_size?: true
    website_url?: true
    logo_path?: true
    founded_year?: true
  }

  export type EmployerCountAggregateInputType = {
    id?: true
    user_id?: true
    company_name?: true
    company_description?: true
    industry?: true
    company_size?: true
    website_url?: true
    logo_path?: true
    founded_year?: true
    _all?: true
  }

  export type EmployerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employer to aggregate.
     */
    where?: EmployerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employers to fetch.
     */
    orderBy?: EmployerOrderByWithRelationInput | EmployerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Employers
    **/
    _count?: true | EmployerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmployerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmployerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployerMaxAggregateInputType
  }

  export type GetEmployerAggregateType<T extends EmployerAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployer[P]>
      : GetScalarType<T[P], AggregateEmployer[P]>
  }




  export type EmployerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployerWhereInput
    orderBy?: EmployerOrderByWithAggregationInput | EmployerOrderByWithAggregationInput[]
    by: EmployerScalarFieldEnum[] | EmployerScalarFieldEnum
    having?: EmployerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployerCountAggregateInputType | true
    _avg?: EmployerAvgAggregateInputType
    _sum?: EmployerSumAggregateInputType
    _min?: EmployerMinAggregateInputType
    _max?: EmployerMaxAggregateInputType
  }

  export type EmployerGroupByOutputType = {
    id: number
    user_id: number
    company_name: string
    company_description: string | null
    industry: string | null
    company_size: string | null
    website_url: string | null
    logo_path: string | null
    founded_year: number | null
    _count: EmployerCountAggregateOutputType | null
    _avg: EmployerAvgAggregateOutputType | null
    _sum: EmployerSumAggregateOutputType | null
    _min: EmployerMinAggregateOutputType | null
    _max: EmployerMaxAggregateOutputType | null
  }

  type GetEmployerGroupByPayload<T extends EmployerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployerGroupByOutputType[P]>
            : GetScalarType<T[P], EmployerGroupByOutputType[P]>
        }
      >
    >


  export type EmployerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    company_name?: boolean
    company_description?: boolean
    industry?: boolean
    company_size?: boolean
    website_url?: boolean
    logo_path?: boolean
    founded_year?: boolean
    job_listings?: boolean | Employer$job_listingsArgs<ExtArgs>
    applications?: boolean | Employer$applicationsArgs<ExtArgs>
    _count?: boolean | EmployerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["employer"]>



  export type EmployerSelectScalar = {
    id?: boolean
    user_id?: boolean
    company_name?: boolean
    company_description?: boolean
    industry?: boolean
    company_size?: boolean
    website_url?: boolean
    logo_path?: boolean
    founded_year?: boolean
  }

  export type EmployerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "company_name" | "company_description" | "industry" | "company_size" | "website_url" | "logo_path" | "founded_year", ExtArgs["result"]["employer"]>
  export type EmployerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job_listings?: boolean | Employer$job_listingsArgs<ExtArgs>
    applications?: boolean | Employer$applicationsArgs<ExtArgs>
    _count?: boolean | EmployerCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $EmployerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Employer"
    objects: {
      job_listings: Prisma.$JobListingPayload<ExtArgs>[]
      applications: Prisma.$JobApplicationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      company_name: string
      company_description: string | null
      industry: string | null
      company_size: string | null
      website_url: string | null
      logo_path: string | null
      founded_year: number | null
    }, ExtArgs["result"]["employer"]>
    composites: {}
  }

  type EmployerGetPayload<S extends boolean | null | undefined | EmployerDefaultArgs> = $Result.GetResult<Prisma.$EmployerPayload, S>

  type EmployerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmployerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmployerCountAggregateInputType | true
    }

  export interface EmployerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Employer'], meta: { name: 'Employer' } }
    /**
     * Find zero or one Employer that matches the filter.
     * @param {EmployerFindUniqueArgs} args - Arguments to find a Employer
     * @example
     * // Get one Employer
     * const employer = await prisma.employer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmployerFindUniqueArgs>(args: SelectSubset<T, EmployerFindUniqueArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Employer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmployerFindUniqueOrThrowArgs} args - Arguments to find a Employer
     * @example
     * // Get one Employer
     * const employer = await prisma.employer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmployerFindUniqueOrThrowArgs>(args: SelectSubset<T, EmployerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployerFindFirstArgs} args - Arguments to find a Employer
     * @example
     * // Get one Employer
     * const employer = await prisma.employer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmployerFindFirstArgs>(args?: SelectSubset<T, EmployerFindFirstArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Employer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployerFindFirstOrThrowArgs} args - Arguments to find a Employer
     * @example
     * // Get one Employer
     * const employer = await prisma.employer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmployerFindFirstOrThrowArgs>(args?: SelectSubset<T, EmployerFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Employers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Employers
     * const employers = await prisma.employer.findMany()
     * 
     * // Get first 10 Employers
     * const employers = await prisma.employer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employerWithIdOnly = await prisma.employer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmployerFindManyArgs>(args?: SelectSubset<T, EmployerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Employer.
     * @param {EmployerCreateArgs} args - Arguments to create a Employer.
     * @example
     * // Create one Employer
     * const Employer = await prisma.employer.create({
     *   data: {
     *     // ... data to create a Employer
     *   }
     * })
     * 
     */
    create<T extends EmployerCreateArgs>(args: SelectSubset<T, EmployerCreateArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Employers.
     * @param {EmployerCreateManyArgs} args - Arguments to create many Employers.
     * @example
     * // Create many Employers
     * const employer = await prisma.employer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmployerCreateManyArgs>(args?: SelectSubset<T, EmployerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Employer.
     * @param {EmployerDeleteArgs} args - Arguments to delete one Employer.
     * @example
     * // Delete one Employer
     * const Employer = await prisma.employer.delete({
     *   where: {
     *     // ... filter to delete one Employer
     *   }
     * })
     * 
     */
    delete<T extends EmployerDeleteArgs>(args: SelectSubset<T, EmployerDeleteArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Employer.
     * @param {EmployerUpdateArgs} args - Arguments to update one Employer.
     * @example
     * // Update one Employer
     * const employer = await prisma.employer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmployerUpdateArgs>(args: SelectSubset<T, EmployerUpdateArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Employers.
     * @param {EmployerDeleteManyArgs} args - Arguments to filter Employers to delete.
     * @example
     * // Delete a few Employers
     * const { count } = await prisma.employer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmployerDeleteManyArgs>(args?: SelectSubset<T, EmployerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Employers
     * const employer = await prisma.employer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmployerUpdateManyArgs>(args: SelectSubset<T, EmployerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Employer.
     * @param {EmployerUpsertArgs} args - Arguments to update or create a Employer.
     * @example
     * // Update or create a Employer
     * const employer = await prisma.employer.upsert({
     *   create: {
     *     // ... data to create a Employer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Employer we want to update
     *   }
     * })
     */
    upsert<T extends EmployerUpsertArgs>(args: SelectSubset<T, EmployerUpsertArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Employers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployerCountArgs} args - Arguments to filter Employers to count.
     * @example
     * // Count the number of Employers
     * const count = await prisma.employer.count({
     *   where: {
     *     // ... the filter for the Employers we want to count
     *   }
     * })
    **/
    count<T extends EmployerCountArgs>(
      args?: Subset<T, EmployerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Employer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmployerAggregateArgs>(args: Subset<T, EmployerAggregateArgs>): Prisma.PrismaPromise<GetEmployerAggregateType<T>>

    /**
     * Group by Employer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmployerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployerGroupByArgs['orderBy'] }
        : { orderBy?: EmployerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmployerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Employer model
   */
  readonly fields: EmployerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Employer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    job_listings<T extends Employer$job_listingsArgs<ExtArgs> = {}>(args?: Subset<T, Employer$job_listingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    applications<T extends Employer$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, Employer$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Employer model
   */
  interface EmployerFieldRefs {
    readonly id: FieldRef<"Employer", 'Int'>
    readonly user_id: FieldRef<"Employer", 'Int'>
    readonly company_name: FieldRef<"Employer", 'String'>
    readonly company_description: FieldRef<"Employer", 'String'>
    readonly industry: FieldRef<"Employer", 'String'>
    readonly company_size: FieldRef<"Employer", 'String'>
    readonly website_url: FieldRef<"Employer", 'String'>
    readonly logo_path: FieldRef<"Employer", 'String'>
    readonly founded_year: FieldRef<"Employer", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Employer findUnique
   */
  export type EmployerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    /**
     * Filter, which Employer to fetch.
     */
    where: EmployerWhereUniqueInput
  }

  /**
   * Employer findUniqueOrThrow
   */
  export type EmployerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    /**
     * Filter, which Employer to fetch.
     */
    where: EmployerWhereUniqueInput
  }

  /**
   * Employer findFirst
   */
  export type EmployerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    /**
     * Filter, which Employer to fetch.
     */
    where?: EmployerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employers to fetch.
     */
    orderBy?: EmployerOrderByWithRelationInput | EmployerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employers.
     */
    cursor?: EmployerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employers.
     */
    distinct?: EmployerScalarFieldEnum | EmployerScalarFieldEnum[]
  }

  /**
   * Employer findFirstOrThrow
   */
  export type EmployerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    /**
     * Filter, which Employer to fetch.
     */
    where?: EmployerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employers to fetch.
     */
    orderBy?: EmployerOrderByWithRelationInput | EmployerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employers.
     */
    cursor?: EmployerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employers.
     */
    distinct?: EmployerScalarFieldEnum | EmployerScalarFieldEnum[]
  }

  /**
   * Employer findMany
   */
  export type EmployerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    /**
     * Filter, which Employers to fetch.
     */
    where?: EmployerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employers to fetch.
     */
    orderBy?: EmployerOrderByWithRelationInput | EmployerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Employers.
     */
    cursor?: EmployerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employers.
     */
    skip?: number
    distinct?: EmployerScalarFieldEnum | EmployerScalarFieldEnum[]
  }

  /**
   * Employer create
   */
  export type EmployerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    /**
     * The data needed to create a Employer.
     */
    data: XOR<EmployerCreateInput, EmployerUncheckedCreateInput>
  }

  /**
   * Employer createMany
   */
  export type EmployerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Employers.
     */
    data: EmployerCreateManyInput | EmployerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Employer update
   */
  export type EmployerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    /**
     * The data needed to update a Employer.
     */
    data: XOR<EmployerUpdateInput, EmployerUncheckedUpdateInput>
    /**
     * Choose, which Employer to update.
     */
    where: EmployerWhereUniqueInput
  }

  /**
   * Employer updateMany
   */
  export type EmployerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Employers.
     */
    data: XOR<EmployerUpdateManyMutationInput, EmployerUncheckedUpdateManyInput>
    /**
     * Filter which Employers to update
     */
    where?: EmployerWhereInput
    /**
     * Limit how many Employers to update.
     */
    limit?: number
  }

  /**
   * Employer upsert
   */
  export type EmployerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    /**
     * The filter to search for the Employer to update in case it exists.
     */
    where: EmployerWhereUniqueInput
    /**
     * In case the Employer found by the `where` argument doesn't exist, create a new Employer with this data.
     */
    create: XOR<EmployerCreateInput, EmployerUncheckedCreateInput>
    /**
     * In case the Employer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployerUpdateInput, EmployerUncheckedUpdateInput>
  }

  /**
   * Employer delete
   */
  export type EmployerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
    /**
     * Filter which Employer to delete.
     */
    where: EmployerWhereUniqueInput
  }

  /**
   * Employer deleteMany
   */
  export type EmployerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employers to delete
     */
    where?: EmployerWhereInput
    /**
     * Limit how many Employers to delete.
     */
    limit?: number
  }

  /**
   * Employer.job_listings
   */
  export type Employer$job_listingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobListing
     */
    select?: JobListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobListing
     */
    omit?: JobListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobListingInclude<ExtArgs> | null
    where?: JobListingWhereInput
    orderBy?: JobListingOrderByWithRelationInput | JobListingOrderByWithRelationInput[]
    cursor?: JobListingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobListingScalarFieldEnum | JobListingScalarFieldEnum[]
  }

  /**
   * Employer.applications
   */
  export type Employer$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    where?: JobApplicationWhereInput
    orderBy?: JobApplicationOrderByWithRelationInput | JobApplicationOrderByWithRelationInput[]
    cursor?: JobApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobApplicationScalarFieldEnum | JobApplicationScalarFieldEnum[]
  }

  /**
   * Employer without action
   */
  export type EmployerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employer
     */
    select?: EmployerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Employer
     */
    omit?: EmployerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmployerInclude<ExtArgs> | null
  }


  /**
   * Model JobApplication
   */

  export type AggregateJobApplication = {
    _count: JobApplicationCountAggregateOutputType | null
    _avg: JobApplicationAvgAggregateOutputType | null
    _sum: JobApplicationSumAggregateOutputType | null
    _min: JobApplicationMinAggregateOutputType | null
    _max: JobApplicationMaxAggregateOutputType | null
  }

  export type JobApplicationAvgAggregateOutputType = {
    id: number | null
    job_id: number | null
    seeker_id: number | null
    employer_id: number | null
  }

  export type JobApplicationSumAggregateOutputType = {
    id: number | null
    job_id: number | null
    seeker_id: number | null
    employer_id: number | null
  }

  export type JobApplicationMinAggregateOutputType = {
    id: number | null
    job_id: number | null
    seeker_id: number | null
    employer_id: number | null
    application_date: Date | null
    cover_letter: string | null
    status: string | null
    notes: string | null
  }

  export type JobApplicationMaxAggregateOutputType = {
    id: number | null
    job_id: number | null
    seeker_id: number | null
    employer_id: number | null
    application_date: Date | null
    cover_letter: string | null
    status: string | null
    notes: string | null
  }

  export type JobApplicationCountAggregateOutputType = {
    id: number
    job_id: number
    seeker_id: number
    employer_id: number
    application_date: number
    cover_letter: number
    status: number
    notes: number
    _all: number
  }


  export type JobApplicationAvgAggregateInputType = {
    id?: true
    job_id?: true
    seeker_id?: true
    employer_id?: true
  }

  export type JobApplicationSumAggregateInputType = {
    id?: true
    job_id?: true
    seeker_id?: true
    employer_id?: true
  }

  export type JobApplicationMinAggregateInputType = {
    id?: true
    job_id?: true
    seeker_id?: true
    employer_id?: true
    application_date?: true
    cover_letter?: true
    status?: true
    notes?: true
  }

  export type JobApplicationMaxAggregateInputType = {
    id?: true
    job_id?: true
    seeker_id?: true
    employer_id?: true
    application_date?: true
    cover_letter?: true
    status?: true
    notes?: true
  }

  export type JobApplicationCountAggregateInputType = {
    id?: true
    job_id?: true
    seeker_id?: true
    employer_id?: true
    application_date?: true
    cover_letter?: true
    status?: true
    notes?: true
    _all?: true
  }

  export type JobApplicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobApplication to aggregate.
     */
    where?: JobApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobApplications to fetch.
     */
    orderBy?: JobApplicationOrderByWithRelationInput | JobApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JobApplications
    **/
    _count?: true | JobApplicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobApplicationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobApplicationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobApplicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobApplicationMaxAggregateInputType
  }

  export type GetJobApplicationAggregateType<T extends JobApplicationAggregateArgs> = {
        [P in keyof T & keyof AggregateJobApplication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobApplication[P]>
      : GetScalarType<T[P], AggregateJobApplication[P]>
  }




  export type JobApplicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobApplicationWhereInput
    orderBy?: JobApplicationOrderByWithAggregationInput | JobApplicationOrderByWithAggregationInput[]
    by: JobApplicationScalarFieldEnum[] | JobApplicationScalarFieldEnum
    having?: JobApplicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobApplicationCountAggregateInputType | true
    _avg?: JobApplicationAvgAggregateInputType
    _sum?: JobApplicationSumAggregateInputType
    _min?: JobApplicationMinAggregateInputType
    _max?: JobApplicationMaxAggregateInputType
  }

  export type JobApplicationGroupByOutputType = {
    id: number
    job_id: number
    seeker_id: number
    employer_id: number
    application_date: Date
    cover_letter: string | null
    status: string
    notes: string | null
    _count: JobApplicationCountAggregateOutputType | null
    _avg: JobApplicationAvgAggregateOutputType | null
    _sum: JobApplicationSumAggregateOutputType | null
    _min: JobApplicationMinAggregateOutputType | null
    _max: JobApplicationMaxAggregateOutputType | null
  }

  type GetJobApplicationGroupByPayload<T extends JobApplicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobApplicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobApplicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobApplicationGroupByOutputType[P]>
            : GetScalarType<T[P], JobApplicationGroupByOutputType[P]>
        }
      >
    >


  export type JobApplicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    job_id?: boolean
    seeker_id?: boolean
    employer_id?: boolean
    application_date?: boolean
    cover_letter?: boolean
    status?: boolean
    notes?: boolean
    job_listing?: boolean | JobListingDefaultArgs<ExtArgs>
    seeker?: boolean | JobSeekerDefaultArgs<ExtArgs>
    employer?: boolean | EmployerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobApplication"]>



  export type JobApplicationSelectScalar = {
    id?: boolean
    job_id?: boolean
    seeker_id?: boolean
    employer_id?: boolean
    application_date?: boolean
    cover_letter?: boolean
    status?: boolean
    notes?: boolean
  }

  export type JobApplicationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "job_id" | "seeker_id" | "employer_id" | "application_date" | "cover_letter" | "status" | "notes", ExtArgs["result"]["jobApplication"]>
  export type JobApplicationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job_listing?: boolean | JobListingDefaultArgs<ExtArgs>
    seeker?: boolean | JobSeekerDefaultArgs<ExtArgs>
    employer?: boolean | EmployerDefaultArgs<ExtArgs>
  }

  export type $JobApplicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobApplication"
    objects: {
      job_listing: Prisma.$JobListingPayload<ExtArgs>
      seeker: Prisma.$JobSeekerPayload<ExtArgs>
      employer: Prisma.$EmployerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      job_id: number
      seeker_id: number
      employer_id: number
      application_date: Date
      cover_letter: string | null
      status: string
      notes: string | null
    }, ExtArgs["result"]["jobApplication"]>
    composites: {}
  }

  type JobApplicationGetPayload<S extends boolean | null | undefined | JobApplicationDefaultArgs> = $Result.GetResult<Prisma.$JobApplicationPayload, S>

  type JobApplicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobApplicationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobApplicationCountAggregateInputType | true
    }

  export interface JobApplicationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JobApplication'], meta: { name: 'JobApplication' } }
    /**
     * Find zero or one JobApplication that matches the filter.
     * @param {JobApplicationFindUniqueArgs} args - Arguments to find a JobApplication
     * @example
     * // Get one JobApplication
     * const jobApplication = await prisma.jobApplication.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobApplicationFindUniqueArgs>(args: SelectSubset<T, JobApplicationFindUniqueArgs<ExtArgs>>): Prisma__JobApplicationClient<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JobApplication that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobApplicationFindUniqueOrThrowArgs} args - Arguments to find a JobApplication
     * @example
     * // Get one JobApplication
     * const jobApplication = await prisma.jobApplication.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobApplicationFindUniqueOrThrowArgs>(args: SelectSubset<T, JobApplicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobApplicationClient<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobApplication that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobApplicationFindFirstArgs} args - Arguments to find a JobApplication
     * @example
     * // Get one JobApplication
     * const jobApplication = await prisma.jobApplication.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobApplicationFindFirstArgs>(args?: SelectSubset<T, JobApplicationFindFirstArgs<ExtArgs>>): Prisma__JobApplicationClient<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobApplication that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobApplicationFindFirstOrThrowArgs} args - Arguments to find a JobApplication
     * @example
     * // Get one JobApplication
     * const jobApplication = await prisma.jobApplication.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobApplicationFindFirstOrThrowArgs>(args?: SelectSubset<T, JobApplicationFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobApplicationClient<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JobApplications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobApplicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JobApplications
     * const jobApplications = await prisma.jobApplication.findMany()
     * 
     * // Get first 10 JobApplications
     * const jobApplications = await prisma.jobApplication.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobApplicationWithIdOnly = await prisma.jobApplication.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobApplicationFindManyArgs>(args?: SelectSubset<T, JobApplicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JobApplication.
     * @param {JobApplicationCreateArgs} args - Arguments to create a JobApplication.
     * @example
     * // Create one JobApplication
     * const JobApplication = await prisma.jobApplication.create({
     *   data: {
     *     // ... data to create a JobApplication
     *   }
     * })
     * 
     */
    create<T extends JobApplicationCreateArgs>(args: SelectSubset<T, JobApplicationCreateArgs<ExtArgs>>): Prisma__JobApplicationClient<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JobApplications.
     * @param {JobApplicationCreateManyArgs} args - Arguments to create many JobApplications.
     * @example
     * // Create many JobApplications
     * const jobApplication = await prisma.jobApplication.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobApplicationCreateManyArgs>(args?: SelectSubset<T, JobApplicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a JobApplication.
     * @param {JobApplicationDeleteArgs} args - Arguments to delete one JobApplication.
     * @example
     * // Delete one JobApplication
     * const JobApplication = await prisma.jobApplication.delete({
     *   where: {
     *     // ... filter to delete one JobApplication
     *   }
     * })
     * 
     */
    delete<T extends JobApplicationDeleteArgs>(args: SelectSubset<T, JobApplicationDeleteArgs<ExtArgs>>): Prisma__JobApplicationClient<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JobApplication.
     * @param {JobApplicationUpdateArgs} args - Arguments to update one JobApplication.
     * @example
     * // Update one JobApplication
     * const jobApplication = await prisma.jobApplication.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobApplicationUpdateArgs>(args: SelectSubset<T, JobApplicationUpdateArgs<ExtArgs>>): Prisma__JobApplicationClient<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JobApplications.
     * @param {JobApplicationDeleteManyArgs} args - Arguments to filter JobApplications to delete.
     * @example
     * // Delete a few JobApplications
     * const { count } = await prisma.jobApplication.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobApplicationDeleteManyArgs>(args?: SelectSubset<T, JobApplicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobApplicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JobApplications
     * const jobApplication = await prisma.jobApplication.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobApplicationUpdateManyArgs>(args: SelectSubset<T, JobApplicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one JobApplication.
     * @param {JobApplicationUpsertArgs} args - Arguments to update or create a JobApplication.
     * @example
     * // Update or create a JobApplication
     * const jobApplication = await prisma.jobApplication.upsert({
     *   create: {
     *     // ... data to create a JobApplication
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JobApplication we want to update
     *   }
     * })
     */
    upsert<T extends JobApplicationUpsertArgs>(args: SelectSubset<T, JobApplicationUpsertArgs<ExtArgs>>): Prisma__JobApplicationClient<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JobApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobApplicationCountArgs} args - Arguments to filter JobApplications to count.
     * @example
     * // Count the number of JobApplications
     * const count = await prisma.jobApplication.count({
     *   where: {
     *     // ... the filter for the JobApplications we want to count
     *   }
     * })
    **/
    count<T extends JobApplicationCountArgs>(
      args?: Subset<T, JobApplicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobApplicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JobApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobApplicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JobApplicationAggregateArgs>(args: Subset<T, JobApplicationAggregateArgs>): Prisma.PrismaPromise<GetJobApplicationAggregateType<T>>

    /**
     * Group by JobApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobApplicationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JobApplicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobApplicationGroupByArgs['orderBy'] }
        : { orderBy?: JobApplicationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JobApplicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobApplicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JobApplication model
   */
  readonly fields: JobApplicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JobApplication.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobApplicationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    job_listing<T extends JobListingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JobListingDefaultArgs<ExtArgs>>): Prisma__JobListingClient<$Result.GetResult<Prisma.$JobListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    seeker<T extends JobSeekerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JobSeekerDefaultArgs<ExtArgs>>): Prisma__JobSeekerClient<$Result.GetResult<Prisma.$JobSeekerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    employer<T extends EmployerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployerDefaultArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JobApplication model
   */
  interface JobApplicationFieldRefs {
    readonly id: FieldRef<"JobApplication", 'Int'>
    readonly job_id: FieldRef<"JobApplication", 'Int'>
    readonly seeker_id: FieldRef<"JobApplication", 'Int'>
    readonly employer_id: FieldRef<"JobApplication", 'Int'>
    readonly application_date: FieldRef<"JobApplication", 'DateTime'>
    readonly cover_letter: FieldRef<"JobApplication", 'String'>
    readonly status: FieldRef<"JobApplication", 'String'>
    readonly notes: FieldRef<"JobApplication", 'String'>
  }
    

  // Custom InputTypes
  /**
   * JobApplication findUnique
   */
  export type JobApplicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    /**
     * Filter, which JobApplication to fetch.
     */
    where: JobApplicationWhereUniqueInput
  }

  /**
   * JobApplication findUniqueOrThrow
   */
  export type JobApplicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    /**
     * Filter, which JobApplication to fetch.
     */
    where: JobApplicationWhereUniqueInput
  }

  /**
   * JobApplication findFirst
   */
  export type JobApplicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    /**
     * Filter, which JobApplication to fetch.
     */
    where?: JobApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobApplications to fetch.
     */
    orderBy?: JobApplicationOrderByWithRelationInput | JobApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobApplications.
     */
    cursor?: JobApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobApplications.
     */
    distinct?: JobApplicationScalarFieldEnum | JobApplicationScalarFieldEnum[]
  }

  /**
   * JobApplication findFirstOrThrow
   */
  export type JobApplicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    /**
     * Filter, which JobApplication to fetch.
     */
    where?: JobApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobApplications to fetch.
     */
    orderBy?: JobApplicationOrderByWithRelationInput | JobApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobApplications.
     */
    cursor?: JobApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobApplications.
     */
    distinct?: JobApplicationScalarFieldEnum | JobApplicationScalarFieldEnum[]
  }

  /**
   * JobApplication findMany
   */
  export type JobApplicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    /**
     * Filter, which JobApplications to fetch.
     */
    where?: JobApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobApplications to fetch.
     */
    orderBy?: JobApplicationOrderByWithRelationInput | JobApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JobApplications.
     */
    cursor?: JobApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobApplications.
     */
    skip?: number
    distinct?: JobApplicationScalarFieldEnum | JobApplicationScalarFieldEnum[]
  }

  /**
   * JobApplication create
   */
  export type JobApplicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    /**
     * The data needed to create a JobApplication.
     */
    data: XOR<JobApplicationCreateInput, JobApplicationUncheckedCreateInput>
  }

  /**
   * JobApplication createMany
   */
  export type JobApplicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JobApplications.
     */
    data: JobApplicationCreateManyInput | JobApplicationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JobApplication update
   */
  export type JobApplicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    /**
     * The data needed to update a JobApplication.
     */
    data: XOR<JobApplicationUpdateInput, JobApplicationUncheckedUpdateInput>
    /**
     * Choose, which JobApplication to update.
     */
    where: JobApplicationWhereUniqueInput
  }

  /**
   * JobApplication updateMany
   */
  export type JobApplicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JobApplications.
     */
    data: XOR<JobApplicationUpdateManyMutationInput, JobApplicationUncheckedUpdateManyInput>
    /**
     * Filter which JobApplications to update
     */
    where?: JobApplicationWhereInput
    /**
     * Limit how many JobApplications to update.
     */
    limit?: number
  }

  /**
   * JobApplication upsert
   */
  export type JobApplicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    /**
     * The filter to search for the JobApplication to update in case it exists.
     */
    where: JobApplicationWhereUniqueInput
    /**
     * In case the JobApplication found by the `where` argument doesn't exist, create a new JobApplication with this data.
     */
    create: XOR<JobApplicationCreateInput, JobApplicationUncheckedCreateInput>
    /**
     * In case the JobApplication was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobApplicationUpdateInput, JobApplicationUncheckedUpdateInput>
  }

  /**
   * JobApplication delete
   */
  export type JobApplicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    /**
     * Filter which JobApplication to delete.
     */
    where: JobApplicationWhereUniqueInput
  }

  /**
   * JobApplication deleteMany
   */
  export type JobApplicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobApplications to delete
     */
    where?: JobApplicationWhereInput
    /**
     * Limit how many JobApplications to delete.
     */
    limit?: number
  }

  /**
   * JobApplication without action
   */
  export type JobApplicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
  }


  /**
   * Model JobListing
   */

  export type AggregateJobListing = {
    _count: JobListingCountAggregateOutputType | null
    _avg: JobListingAvgAggregateOutputType | null
    _sum: JobListingSumAggregateOutputType | null
    _min: JobListingMinAggregateOutputType | null
    _max: JobListingMaxAggregateOutputType | null
  }

  export type JobListingAvgAggregateOutputType = {
    id: number | null
    employer_id: number | null
    salary_range_min: number | null
    salary_range_max: number | null
  }

  export type JobListingSumAggregateOutputType = {
    id: number | null
    employer_id: number | null
    salary_range_min: number | null
    salary_range_max: number | null
  }

  export type JobListingMinAggregateOutputType = {
    id: number | null
    employer_id: number | null
    job_title: string | null
    job_description: string | null
    job_requirements: string | null
    job_location: string | null
    job_type: string | null
    salary_range_min: number | null
    salary_range_max: number | null
    posted_date: Date | null
    expiration_date: Date | null
    is_active: boolean | null
  }

  export type JobListingMaxAggregateOutputType = {
    id: number | null
    employer_id: number | null
    job_title: string | null
    job_description: string | null
    job_requirements: string | null
    job_location: string | null
    job_type: string | null
    salary_range_min: number | null
    salary_range_max: number | null
    posted_date: Date | null
    expiration_date: Date | null
    is_active: boolean | null
  }

  export type JobListingCountAggregateOutputType = {
    id: number
    employer_id: number
    job_title: number
    job_description: number
    job_requirements: number
    job_location: number
    job_type: number
    salary_range_min: number
    salary_range_max: number
    posted_date: number
    expiration_date: number
    is_active: number
    _all: number
  }


  export type JobListingAvgAggregateInputType = {
    id?: true
    employer_id?: true
    salary_range_min?: true
    salary_range_max?: true
  }

  export type JobListingSumAggregateInputType = {
    id?: true
    employer_id?: true
    salary_range_min?: true
    salary_range_max?: true
  }

  export type JobListingMinAggregateInputType = {
    id?: true
    employer_id?: true
    job_title?: true
    job_description?: true
    job_requirements?: true
    job_location?: true
    job_type?: true
    salary_range_min?: true
    salary_range_max?: true
    posted_date?: true
    expiration_date?: true
    is_active?: true
  }

  export type JobListingMaxAggregateInputType = {
    id?: true
    employer_id?: true
    job_title?: true
    job_description?: true
    job_requirements?: true
    job_location?: true
    job_type?: true
    salary_range_min?: true
    salary_range_max?: true
    posted_date?: true
    expiration_date?: true
    is_active?: true
  }

  export type JobListingCountAggregateInputType = {
    id?: true
    employer_id?: true
    job_title?: true
    job_description?: true
    job_requirements?: true
    job_location?: true
    job_type?: true
    salary_range_min?: true
    salary_range_max?: true
    posted_date?: true
    expiration_date?: true
    is_active?: true
    _all?: true
  }

  export type JobListingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobListing to aggregate.
     */
    where?: JobListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobListings to fetch.
     */
    orderBy?: JobListingOrderByWithRelationInput | JobListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JobListings
    **/
    _count?: true | JobListingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobListingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobListingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobListingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobListingMaxAggregateInputType
  }

  export type GetJobListingAggregateType<T extends JobListingAggregateArgs> = {
        [P in keyof T & keyof AggregateJobListing]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobListing[P]>
      : GetScalarType<T[P], AggregateJobListing[P]>
  }




  export type JobListingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobListingWhereInput
    orderBy?: JobListingOrderByWithAggregationInput | JobListingOrderByWithAggregationInput[]
    by: JobListingScalarFieldEnum[] | JobListingScalarFieldEnum
    having?: JobListingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobListingCountAggregateInputType | true
    _avg?: JobListingAvgAggregateInputType
    _sum?: JobListingSumAggregateInputType
    _min?: JobListingMinAggregateInputType
    _max?: JobListingMaxAggregateInputType
  }

  export type JobListingGroupByOutputType = {
    id: number
    employer_id: number
    job_title: string
    job_description: string | null
    job_requirements: string | null
    job_location: string | null
    job_type: string | null
    salary_range_min: number | null
    salary_range_max: number | null
    posted_date: Date
    expiration_date: Date | null
    is_active: boolean
    _count: JobListingCountAggregateOutputType | null
    _avg: JobListingAvgAggregateOutputType | null
    _sum: JobListingSumAggregateOutputType | null
    _min: JobListingMinAggregateOutputType | null
    _max: JobListingMaxAggregateOutputType | null
  }

  type GetJobListingGroupByPayload<T extends JobListingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobListingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobListingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobListingGroupByOutputType[P]>
            : GetScalarType<T[P], JobListingGroupByOutputType[P]>
        }
      >
    >


  export type JobListingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employer_id?: boolean
    job_title?: boolean
    job_description?: boolean
    job_requirements?: boolean
    job_location?: boolean
    job_type?: boolean
    salary_range_min?: boolean
    salary_range_max?: boolean
    posted_date?: boolean
    expiration_date?: boolean
    is_active?: boolean
    employer?: boolean | EmployerDefaultArgs<ExtArgs>
    applications?: boolean | JobListing$applicationsArgs<ExtArgs>
    required_skills?: boolean | JobListing$required_skillsArgs<ExtArgs>
    _count?: boolean | JobListingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobListing"]>



  export type JobListingSelectScalar = {
    id?: boolean
    employer_id?: boolean
    job_title?: boolean
    job_description?: boolean
    job_requirements?: boolean
    job_location?: boolean
    job_type?: boolean
    salary_range_min?: boolean
    salary_range_max?: boolean
    posted_date?: boolean
    expiration_date?: boolean
    is_active?: boolean
  }

  export type JobListingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employer_id" | "job_title" | "job_description" | "job_requirements" | "job_location" | "job_type" | "salary_range_min" | "salary_range_max" | "posted_date" | "expiration_date" | "is_active", ExtArgs["result"]["jobListing"]>
  export type JobListingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employer?: boolean | EmployerDefaultArgs<ExtArgs>
    applications?: boolean | JobListing$applicationsArgs<ExtArgs>
    required_skills?: boolean | JobListing$required_skillsArgs<ExtArgs>
    _count?: boolean | JobListingCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $JobListingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobListing"
    objects: {
      employer: Prisma.$EmployerPayload<ExtArgs>
      applications: Prisma.$JobApplicationPayload<ExtArgs>[]
      required_skills: Prisma.$JobRequiredSkillPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      employer_id: number
      job_title: string
      job_description: string | null
      job_requirements: string | null
      job_location: string | null
      job_type: string | null
      salary_range_min: number | null
      salary_range_max: number | null
      posted_date: Date
      expiration_date: Date | null
      is_active: boolean
    }, ExtArgs["result"]["jobListing"]>
    composites: {}
  }

  type JobListingGetPayload<S extends boolean | null | undefined | JobListingDefaultArgs> = $Result.GetResult<Prisma.$JobListingPayload, S>

  type JobListingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobListingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobListingCountAggregateInputType | true
    }

  export interface JobListingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JobListing'], meta: { name: 'JobListing' } }
    /**
     * Find zero or one JobListing that matches the filter.
     * @param {JobListingFindUniqueArgs} args - Arguments to find a JobListing
     * @example
     * // Get one JobListing
     * const jobListing = await prisma.jobListing.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobListingFindUniqueArgs>(args: SelectSubset<T, JobListingFindUniqueArgs<ExtArgs>>): Prisma__JobListingClient<$Result.GetResult<Prisma.$JobListingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JobListing that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobListingFindUniqueOrThrowArgs} args - Arguments to find a JobListing
     * @example
     * // Get one JobListing
     * const jobListing = await prisma.jobListing.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobListingFindUniqueOrThrowArgs>(args: SelectSubset<T, JobListingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobListingClient<$Result.GetResult<Prisma.$JobListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobListing that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobListingFindFirstArgs} args - Arguments to find a JobListing
     * @example
     * // Get one JobListing
     * const jobListing = await prisma.jobListing.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobListingFindFirstArgs>(args?: SelectSubset<T, JobListingFindFirstArgs<ExtArgs>>): Prisma__JobListingClient<$Result.GetResult<Prisma.$JobListingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobListing that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobListingFindFirstOrThrowArgs} args - Arguments to find a JobListing
     * @example
     * // Get one JobListing
     * const jobListing = await prisma.jobListing.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobListingFindFirstOrThrowArgs>(args?: SelectSubset<T, JobListingFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobListingClient<$Result.GetResult<Prisma.$JobListingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JobListings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobListingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JobListings
     * const jobListings = await prisma.jobListing.findMany()
     * 
     * // Get first 10 JobListings
     * const jobListings = await prisma.jobListing.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobListingWithIdOnly = await prisma.jobListing.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobListingFindManyArgs>(args?: SelectSubset<T, JobListingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JobListing.
     * @param {JobListingCreateArgs} args - Arguments to create a JobListing.
     * @example
     * // Create one JobListing
     * const JobListing = await prisma.jobListing.create({
     *   data: {
     *     // ... data to create a JobListing
     *   }
     * })
     * 
     */
    create<T extends JobListingCreateArgs>(args: SelectSubset<T, JobListingCreateArgs<ExtArgs>>): Prisma__JobListingClient<$Result.GetResult<Prisma.$JobListingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JobListings.
     * @param {JobListingCreateManyArgs} args - Arguments to create many JobListings.
     * @example
     * // Create many JobListings
     * const jobListing = await prisma.jobListing.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobListingCreateManyArgs>(args?: SelectSubset<T, JobListingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a JobListing.
     * @param {JobListingDeleteArgs} args - Arguments to delete one JobListing.
     * @example
     * // Delete one JobListing
     * const JobListing = await prisma.jobListing.delete({
     *   where: {
     *     // ... filter to delete one JobListing
     *   }
     * })
     * 
     */
    delete<T extends JobListingDeleteArgs>(args: SelectSubset<T, JobListingDeleteArgs<ExtArgs>>): Prisma__JobListingClient<$Result.GetResult<Prisma.$JobListingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JobListing.
     * @param {JobListingUpdateArgs} args - Arguments to update one JobListing.
     * @example
     * // Update one JobListing
     * const jobListing = await prisma.jobListing.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobListingUpdateArgs>(args: SelectSubset<T, JobListingUpdateArgs<ExtArgs>>): Prisma__JobListingClient<$Result.GetResult<Prisma.$JobListingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JobListings.
     * @param {JobListingDeleteManyArgs} args - Arguments to filter JobListings to delete.
     * @example
     * // Delete a few JobListings
     * const { count } = await prisma.jobListing.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobListingDeleteManyArgs>(args?: SelectSubset<T, JobListingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobListings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobListingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JobListings
     * const jobListing = await prisma.jobListing.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobListingUpdateManyArgs>(args: SelectSubset<T, JobListingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one JobListing.
     * @param {JobListingUpsertArgs} args - Arguments to update or create a JobListing.
     * @example
     * // Update or create a JobListing
     * const jobListing = await prisma.jobListing.upsert({
     *   create: {
     *     // ... data to create a JobListing
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JobListing we want to update
     *   }
     * })
     */
    upsert<T extends JobListingUpsertArgs>(args: SelectSubset<T, JobListingUpsertArgs<ExtArgs>>): Prisma__JobListingClient<$Result.GetResult<Prisma.$JobListingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JobListings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobListingCountArgs} args - Arguments to filter JobListings to count.
     * @example
     * // Count the number of JobListings
     * const count = await prisma.jobListing.count({
     *   where: {
     *     // ... the filter for the JobListings we want to count
     *   }
     * })
    **/
    count<T extends JobListingCountArgs>(
      args?: Subset<T, JobListingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobListingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JobListing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobListingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JobListingAggregateArgs>(args: Subset<T, JobListingAggregateArgs>): Prisma.PrismaPromise<GetJobListingAggregateType<T>>

    /**
     * Group by JobListing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobListingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JobListingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobListingGroupByArgs['orderBy'] }
        : { orderBy?: JobListingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JobListingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobListingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JobListing model
   */
  readonly fields: JobListingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JobListing.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobListingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    employer<T extends EmployerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployerDefaultArgs<ExtArgs>>): Prisma__EmployerClient<$Result.GetResult<Prisma.$EmployerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    applications<T extends JobListing$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, JobListing$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    required_skills<T extends JobListing$required_skillsArgs<ExtArgs> = {}>(args?: Subset<T, JobListing$required_skillsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobRequiredSkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JobListing model
   */
  interface JobListingFieldRefs {
    readonly id: FieldRef<"JobListing", 'Int'>
    readonly employer_id: FieldRef<"JobListing", 'Int'>
    readonly job_title: FieldRef<"JobListing", 'String'>
    readonly job_description: FieldRef<"JobListing", 'String'>
    readonly job_requirements: FieldRef<"JobListing", 'String'>
    readonly job_location: FieldRef<"JobListing", 'String'>
    readonly job_type: FieldRef<"JobListing", 'String'>
    readonly salary_range_min: FieldRef<"JobListing", 'Float'>
    readonly salary_range_max: FieldRef<"JobListing", 'Float'>
    readonly posted_date: FieldRef<"JobListing", 'DateTime'>
    readonly expiration_date: FieldRef<"JobListing", 'DateTime'>
    readonly is_active: FieldRef<"JobListing", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * JobListing findUnique
   */
  export type JobListingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobListing
     */
    select?: JobListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobListing
     */
    omit?: JobListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobListingInclude<ExtArgs> | null
    /**
     * Filter, which JobListing to fetch.
     */
    where: JobListingWhereUniqueInput
  }

  /**
   * JobListing findUniqueOrThrow
   */
  export type JobListingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobListing
     */
    select?: JobListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobListing
     */
    omit?: JobListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobListingInclude<ExtArgs> | null
    /**
     * Filter, which JobListing to fetch.
     */
    where: JobListingWhereUniqueInput
  }

  /**
   * JobListing findFirst
   */
  export type JobListingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobListing
     */
    select?: JobListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobListing
     */
    omit?: JobListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobListingInclude<ExtArgs> | null
    /**
     * Filter, which JobListing to fetch.
     */
    where?: JobListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobListings to fetch.
     */
    orderBy?: JobListingOrderByWithRelationInput | JobListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobListings.
     */
    cursor?: JobListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobListings.
     */
    distinct?: JobListingScalarFieldEnum | JobListingScalarFieldEnum[]
  }

  /**
   * JobListing findFirstOrThrow
   */
  export type JobListingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobListing
     */
    select?: JobListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobListing
     */
    omit?: JobListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobListingInclude<ExtArgs> | null
    /**
     * Filter, which JobListing to fetch.
     */
    where?: JobListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobListings to fetch.
     */
    orderBy?: JobListingOrderByWithRelationInput | JobListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobListings.
     */
    cursor?: JobListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobListings.
     */
    distinct?: JobListingScalarFieldEnum | JobListingScalarFieldEnum[]
  }

  /**
   * JobListing findMany
   */
  export type JobListingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobListing
     */
    select?: JobListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobListing
     */
    omit?: JobListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobListingInclude<ExtArgs> | null
    /**
     * Filter, which JobListings to fetch.
     */
    where?: JobListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobListings to fetch.
     */
    orderBy?: JobListingOrderByWithRelationInput | JobListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JobListings.
     */
    cursor?: JobListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobListings.
     */
    skip?: number
    distinct?: JobListingScalarFieldEnum | JobListingScalarFieldEnum[]
  }

  /**
   * JobListing create
   */
  export type JobListingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobListing
     */
    select?: JobListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobListing
     */
    omit?: JobListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobListingInclude<ExtArgs> | null
    /**
     * The data needed to create a JobListing.
     */
    data: XOR<JobListingCreateInput, JobListingUncheckedCreateInput>
  }

  /**
   * JobListing createMany
   */
  export type JobListingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JobListings.
     */
    data: JobListingCreateManyInput | JobListingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JobListing update
   */
  export type JobListingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobListing
     */
    select?: JobListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobListing
     */
    omit?: JobListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobListingInclude<ExtArgs> | null
    /**
     * The data needed to update a JobListing.
     */
    data: XOR<JobListingUpdateInput, JobListingUncheckedUpdateInput>
    /**
     * Choose, which JobListing to update.
     */
    where: JobListingWhereUniqueInput
  }

  /**
   * JobListing updateMany
   */
  export type JobListingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JobListings.
     */
    data: XOR<JobListingUpdateManyMutationInput, JobListingUncheckedUpdateManyInput>
    /**
     * Filter which JobListings to update
     */
    where?: JobListingWhereInput
    /**
     * Limit how many JobListings to update.
     */
    limit?: number
  }

  /**
   * JobListing upsert
   */
  export type JobListingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobListing
     */
    select?: JobListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobListing
     */
    omit?: JobListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobListingInclude<ExtArgs> | null
    /**
     * The filter to search for the JobListing to update in case it exists.
     */
    where: JobListingWhereUniqueInput
    /**
     * In case the JobListing found by the `where` argument doesn't exist, create a new JobListing with this data.
     */
    create: XOR<JobListingCreateInput, JobListingUncheckedCreateInput>
    /**
     * In case the JobListing was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobListingUpdateInput, JobListingUncheckedUpdateInput>
  }

  /**
   * JobListing delete
   */
  export type JobListingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobListing
     */
    select?: JobListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobListing
     */
    omit?: JobListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobListingInclude<ExtArgs> | null
    /**
     * Filter which JobListing to delete.
     */
    where: JobListingWhereUniqueInput
  }

  /**
   * JobListing deleteMany
   */
  export type JobListingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobListings to delete
     */
    where?: JobListingWhereInput
    /**
     * Limit how many JobListings to delete.
     */
    limit?: number
  }

  /**
   * JobListing.applications
   */
  export type JobListing$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    where?: JobApplicationWhereInput
    orderBy?: JobApplicationOrderByWithRelationInput | JobApplicationOrderByWithRelationInput[]
    cursor?: JobApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobApplicationScalarFieldEnum | JobApplicationScalarFieldEnum[]
  }

  /**
   * JobListing.required_skills
   */
  export type JobListing$required_skillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRequiredSkill
     */
    select?: JobRequiredSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRequiredSkill
     */
    omit?: JobRequiredSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRequiredSkillInclude<ExtArgs> | null
    where?: JobRequiredSkillWhereInput
    orderBy?: JobRequiredSkillOrderByWithRelationInput | JobRequiredSkillOrderByWithRelationInput[]
    cursor?: JobRequiredSkillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobRequiredSkillScalarFieldEnum | JobRequiredSkillScalarFieldEnum[]
  }

  /**
   * JobListing without action
   */
  export type JobListingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobListing
     */
    select?: JobListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobListing
     */
    omit?: JobListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobListingInclude<ExtArgs> | null
  }


  /**
   * Model JobRequiredSkill
   */

  export type AggregateJobRequiredSkill = {
    _count: JobRequiredSkillCountAggregateOutputType | null
    _avg: JobRequiredSkillAvgAggregateOutputType | null
    _sum: JobRequiredSkillSumAggregateOutputType | null
    _min: JobRequiredSkillMinAggregateOutputType | null
    _max: JobRequiredSkillMaxAggregateOutputType | null
  }

  export type JobRequiredSkillAvgAggregateOutputType = {
    id: number | null
    job_id: number | null
    skill_id: number | null
    importance_level: number | null
  }

  export type JobRequiredSkillSumAggregateOutputType = {
    id: number | null
    job_id: number | null
    skill_id: number | null
    importance_level: number | null
  }

  export type JobRequiredSkillMinAggregateOutputType = {
    id: number | null
    job_id: number | null
    skill_id: number | null
    is_required: boolean | null
    importance_level: number | null
  }

  export type JobRequiredSkillMaxAggregateOutputType = {
    id: number | null
    job_id: number | null
    skill_id: number | null
    is_required: boolean | null
    importance_level: number | null
  }

  export type JobRequiredSkillCountAggregateOutputType = {
    id: number
    job_id: number
    skill_id: number
    is_required: number
    importance_level: number
    _all: number
  }


  export type JobRequiredSkillAvgAggregateInputType = {
    id?: true
    job_id?: true
    skill_id?: true
    importance_level?: true
  }

  export type JobRequiredSkillSumAggregateInputType = {
    id?: true
    job_id?: true
    skill_id?: true
    importance_level?: true
  }

  export type JobRequiredSkillMinAggregateInputType = {
    id?: true
    job_id?: true
    skill_id?: true
    is_required?: true
    importance_level?: true
  }

  export type JobRequiredSkillMaxAggregateInputType = {
    id?: true
    job_id?: true
    skill_id?: true
    is_required?: true
    importance_level?: true
  }

  export type JobRequiredSkillCountAggregateInputType = {
    id?: true
    job_id?: true
    skill_id?: true
    is_required?: true
    importance_level?: true
    _all?: true
  }

  export type JobRequiredSkillAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobRequiredSkill to aggregate.
     */
    where?: JobRequiredSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobRequiredSkills to fetch.
     */
    orderBy?: JobRequiredSkillOrderByWithRelationInput | JobRequiredSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobRequiredSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobRequiredSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobRequiredSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JobRequiredSkills
    **/
    _count?: true | JobRequiredSkillCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobRequiredSkillAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobRequiredSkillSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobRequiredSkillMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobRequiredSkillMaxAggregateInputType
  }

  export type GetJobRequiredSkillAggregateType<T extends JobRequiredSkillAggregateArgs> = {
        [P in keyof T & keyof AggregateJobRequiredSkill]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobRequiredSkill[P]>
      : GetScalarType<T[P], AggregateJobRequiredSkill[P]>
  }




  export type JobRequiredSkillGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobRequiredSkillWhereInput
    orderBy?: JobRequiredSkillOrderByWithAggregationInput | JobRequiredSkillOrderByWithAggregationInput[]
    by: JobRequiredSkillScalarFieldEnum[] | JobRequiredSkillScalarFieldEnum
    having?: JobRequiredSkillScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobRequiredSkillCountAggregateInputType | true
    _avg?: JobRequiredSkillAvgAggregateInputType
    _sum?: JobRequiredSkillSumAggregateInputType
    _min?: JobRequiredSkillMinAggregateInputType
    _max?: JobRequiredSkillMaxAggregateInputType
  }

  export type JobRequiredSkillGroupByOutputType = {
    id: number
    job_id: number
    skill_id: number
    is_required: boolean
    importance_level: number
    _count: JobRequiredSkillCountAggregateOutputType | null
    _avg: JobRequiredSkillAvgAggregateOutputType | null
    _sum: JobRequiredSkillSumAggregateOutputType | null
    _min: JobRequiredSkillMinAggregateOutputType | null
    _max: JobRequiredSkillMaxAggregateOutputType | null
  }

  type GetJobRequiredSkillGroupByPayload<T extends JobRequiredSkillGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobRequiredSkillGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobRequiredSkillGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobRequiredSkillGroupByOutputType[P]>
            : GetScalarType<T[P], JobRequiredSkillGroupByOutputType[P]>
        }
      >
    >


  export type JobRequiredSkillSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    job_id?: boolean
    skill_id?: boolean
    is_required?: boolean
    importance_level?: boolean
    job_listing?: boolean | JobListingDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobRequiredSkill"]>



  export type JobRequiredSkillSelectScalar = {
    id?: boolean
    job_id?: boolean
    skill_id?: boolean
    is_required?: boolean
    importance_level?: boolean
  }

  export type JobRequiredSkillOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "job_id" | "skill_id" | "is_required" | "importance_level", ExtArgs["result"]["jobRequiredSkill"]>
  export type JobRequiredSkillInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job_listing?: boolean | JobListingDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }

  export type $JobRequiredSkillPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobRequiredSkill"
    objects: {
      job_listing: Prisma.$JobListingPayload<ExtArgs>
      skill: Prisma.$SkillPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      job_id: number
      skill_id: number
      is_required: boolean
      importance_level: number
    }, ExtArgs["result"]["jobRequiredSkill"]>
    composites: {}
  }

  type JobRequiredSkillGetPayload<S extends boolean | null | undefined | JobRequiredSkillDefaultArgs> = $Result.GetResult<Prisma.$JobRequiredSkillPayload, S>

  type JobRequiredSkillCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobRequiredSkillFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobRequiredSkillCountAggregateInputType | true
    }

  export interface JobRequiredSkillDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JobRequiredSkill'], meta: { name: 'JobRequiredSkill' } }
    /**
     * Find zero or one JobRequiredSkill that matches the filter.
     * @param {JobRequiredSkillFindUniqueArgs} args - Arguments to find a JobRequiredSkill
     * @example
     * // Get one JobRequiredSkill
     * const jobRequiredSkill = await prisma.jobRequiredSkill.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobRequiredSkillFindUniqueArgs>(args: SelectSubset<T, JobRequiredSkillFindUniqueArgs<ExtArgs>>): Prisma__JobRequiredSkillClient<$Result.GetResult<Prisma.$JobRequiredSkillPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JobRequiredSkill that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobRequiredSkillFindUniqueOrThrowArgs} args - Arguments to find a JobRequiredSkill
     * @example
     * // Get one JobRequiredSkill
     * const jobRequiredSkill = await prisma.jobRequiredSkill.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobRequiredSkillFindUniqueOrThrowArgs>(args: SelectSubset<T, JobRequiredSkillFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobRequiredSkillClient<$Result.GetResult<Prisma.$JobRequiredSkillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobRequiredSkill that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobRequiredSkillFindFirstArgs} args - Arguments to find a JobRequiredSkill
     * @example
     * // Get one JobRequiredSkill
     * const jobRequiredSkill = await prisma.jobRequiredSkill.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobRequiredSkillFindFirstArgs>(args?: SelectSubset<T, JobRequiredSkillFindFirstArgs<ExtArgs>>): Prisma__JobRequiredSkillClient<$Result.GetResult<Prisma.$JobRequiredSkillPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobRequiredSkill that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobRequiredSkillFindFirstOrThrowArgs} args - Arguments to find a JobRequiredSkill
     * @example
     * // Get one JobRequiredSkill
     * const jobRequiredSkill = await prisma.jobRequiredSkill.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobRequiredSkillFindFirstOrThrowArgs>(args?: SelectSubset<T, JobRequiredSkillFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobRequiredSkillClient<$Result.GetResult<Prisma.$JobRequiredSkillPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JobRequiredSkills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobRequiredSkillFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JobRequiredSkills
     * const jobRequiredSkills = await prisma.jobRequiredSkill.findMany()
     * 
     * // Get first 10 JobRequiredSkills
     * const jobRequiredSkills = await prisma.jobRequiredSkill.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobRequiredSkillWithIdOnly = await prisma.jobRequiredSkill.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobRequiredSkillFindManyArgs>(args?: SelectSubset<T, JobRequiredSkillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobRequiredSkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JobRequiredSkill.
     * @param {JobRequiredSkillCreateArgs} args - Arguments to create a JobRequiredSkill.
     * @example
     * // Create one JobRequiredSkill
     * const JobRequiredSkill = await prisma.jobRequiredSkill.create({
     *   data: {
     *     // ... data to create a JobRequiredSkill
     *   }
     * })
     * 
     */
    create<T extends JobRequiredSkillCreateArgs>(args: SelectSubset<T, JobRequiredSkillCreateArgs<ExtArgs>>): Prisma__JobRequiredSkillClient<$Result.GetResult<Prisma.$JobRequiredSkillPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JobRequiredSkills.
     * @param {JobRequiredSkillCreateManyArgs} args - Arguments to create many JobRequiredSkills.
     * @example
     * // Create many JobRequiredSkills
     * const jobRequiredSkill = await prisma.jobRequiredSkill.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobRequiredSkillCreateManyArgs>(args?: SelectSubset<T, JobRequiredSkillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a JobRequiredSkill.
     * @param {JobRequiredSkillDeleteArgs} args - Arguments to delete one JobRequiredSkill.
     * @example
     * // Delete one JobRequiredSkill
     * const JobRequiredSkill = await prisma.jobRequiredSkill.delete({
     *   where: {
     *     // ... filter to delete one JobRequiredSkill
     *   }
     * })
     * 
     */
    delete<T extends JobRequiredSkillDeleteArgs>(args: SelectSubset<T, JobRequiredSkillDeleteArgs<ExtArgs>>): Prisma__JobRequiredSkillClient<$Result.GetResult<Prisma.$JobRequiredSkillPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JobRequiredSkill.
     * @param {JobRequiredSkillUpdateArgs} args - Arguments to update one JobRequiredSkill.
     * @example
     * // Update one JobRequiredSkill
     * const jobRequiredSkill = await prisma.jobRequiredSkill.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobRequiredSkillUpdateArgs>(args: SelectSubset<T, JobRequiredSkillUpdateArgs<ExtArgs>>): Prisma__JobRequiredSkillClient<$Result.GetResult<Prisma.$JobRequiredSkillPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JobRequiredSkills.
     * @param {JobRequiredSkillDeleteManyArgs} args - Arguments to filter JobRequiredSkills to delete.
     * @example
     * // Delete a few JobRequiredSkills
     * const { count } = await prisma.jobRequiredSkill.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobRequiredSkillDeleteManyArgs>(args?: SelectSubset<T, JobRequiredSkillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobRequiredSkills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobRequiredSkillUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JobRequiredSkills
     * const jobRequiredSkill = await prisma.jobRequiredSkill.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobRequiredSkillUpdateManyArgs>(args: SelectSubset<T, JobRequiredSkillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one JobRequiredSkill.
     * @param {JobRequiredSkillUpsertArgs} args - Arguments to update or create a JobRequiredSkill.
     * @example
     * // Update or create a JobRequiredSkill
     * const jobRequiredSkill = await prisma.jobRequiredSkill.upsert({
     *   create: {
     *     // ... data to create a JobRequiredSkill
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JobRequiredSkill we want to update
     *   }
     * })
     */
    upsert<T extends JobRequiredSkillUpsertArgs>(args: SelectSubset<T, JobRequiredSkillUpsertArgs<ExtArgs>>): Prisma__JobRequiredSkillClient<$Result.GetResult<Prisma.$JobRequiredSkillPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JobRequiredSkills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobRequiredSkillCountArgs} args - Arguments to filter JobRequiredSkills to count.
     * @example
     * // Count the number of JobRequiredSkills
     * const count = await prisma.jobRequiredSkill.count({
     *   where: {
     *     // ... the filter for the JobRequiredSkills we want to count
     *   }
     * })
    **/
    count<T extends JobRequiredSkillCountArgs>(
      args?: Subset<T, JobRequiredSkillCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobRequiredSkillCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JobRequiredSkill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobRequiredSkillAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JobRequiredSkillAggregateArgs>(args: Subset<T, JobRequiredSkillAggregateArgs>): Prisma.PrismaPromise<GetJobRequiredSkillAggregateType<T>>

    /**
     * Group by JobRequiredSkill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobRequiredSkillGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JobRequiredSkillGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobRequiredSkillGroupByArgs['orderBy'] }
        : { orderBy?: JobRequiredSkillGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JobRequiredSkillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobRequiredSkillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JobRequiredSkill model
   */
  readonly fields: JobRequiredSkillFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JobRequiredSkill.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobRequiredSkillClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    job_listing<T extends JobListingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JobListingDefaultArgs<ExtArgs>>): Prisma__JobListingClient<$Result.GetResult<Prisma.$JobListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    skill<T extends SkillDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SkillDefaultArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JobRequiredSkill model
   */
  interface JobRequiredSkillFieldRefs {
    readonly id: FieldRef<"JobRequiredSkill", 'Int'>
    readonly job_id: FieldRef<"JobRequiredSkill", 'Int'>
    readonly skill_id: FieldRef<"JobRequiredSkill", 'Int'>
    readonly is_required: FieldRef<"JobRequiredSkill", 'Boolean'>
    readonly importance_level: FieldRef<"JobRequiredSkill", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * JobRequiredSkill findUnique
   */
  export type JobRequiredSkillFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRequiredSkill
     */
    select?: JobRequiredSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRequiredSkill
     */
    omit?: JobRequiredSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRequiredSkillInclude<ExtArgs> | null
    /**
     * Filter, which JobRequiredSkill to fetch.
     */
    where: JobRequiredSkillWhereUniqueInput
  }

  /**
   * JobRequiredSkill findUniqueOrThrow
   */
  export type JobRequiredSkillFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRequiredSkill
     */
    select?: JobRequiredSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRequiredSkill
     */
    omit?: JobRequiredSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRequiredSkillInclude<ExtArgs> | null
    /**
     * Filter, which JobRequiredSkill to fetch.
     */
    where: JobRequiredSkillWhereUniqueInput
  }

  /**
   * JobRequiredSkill findFirst
   */
  export type JobRequiredSkillFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRequiredSkill
     */
    select?: JobRequiredSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRequiredSkill
     */
    omit?: JobRequiredSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRequiredSkillInclude<ExtArgs> | null
    /**
     * Filter, which JobRequiredSkill to fetch.
     */
    where?: JobRequiredSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobRequiredSkills to fetch.
     */
    orderBy?: JobRequiredSkillOrderByWithRelationInput | JobRequiredSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobRequiredSkills.
     */
    cursor?: JobRequiredSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobRequiredSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobRequiredSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobRequiredSkills.
     */
    distinct?: JobRequiredSkillScalarFieldEnum | JobRequiredSkillScalarFieldEnum[]
  }

  /**
   * JobRequiredSkill findFirstOrThrow
   */
  export type JobRequiredSkillFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRequiredSkill
     */
    select?: JobRequiredSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRequiredSkill
     */
    omit?: JobRequiredSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRequiredSkillInclude<ExtArgs> | null
    /**
     * Filter, which JobRequiredSkill to fetch.
     */
    where?: JobRequiredSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobRequiredSkills to fetch.
     */
    orderBy?: JobRequiredSkillOrderByWithRelationInput | JobRequiredSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobRequiredSkills.
     */
    cursor?: JobRequiredSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobRequiredSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobRequiredSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobRequiredSkills.
     */
    distinct?: JobRequiredSkillScalarFieldEnum | JobRequiredSkillScalarFieldEnum[]
  }

  /**
   * JobRequiredSkill findMany
   */
  export type JobRequiredSkillFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRequiredSkill
     */
    select?: JobRequiredSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRequiredSkill
     */
    omit?: JobRequiredSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRequiredSkillInclude<ExtArgs> | null
    /**
     * Filter, which JobRequiredSkills to fetch.
     */
    where?: JobRequiredSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobRequiredSkills to fetch.
     */
    orderBy?: JobRequiredSkillOrderByWithRelationInput | JobRequiredSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JobRequiredSkills.
     */
    cursor?: JobRequiredSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobRequiredSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobRequiredSkills.
     */
    skip?: number
    distinct?: JobRequiredSkillScalarFieldEnum | JobRequiredSkillScalarFieldEnum[]
  }

  /**
   * JobRequiredSkill create
   */
  export type JobRequiredSkillCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRequiredSkill
     */
    select?: JobRequiredSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRequiredSkill
     */
    omit?: JobRequiredSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRequiredSkillInclude<ExtArgs> | null
    /**
     * The data needed to create a JobRequiredSkill.
     */
    data: XOR<JobRequiredSkillCreateInput, JobRequiredSkillUncheckedCreateInput>
  }

  /**
   * JobRequiredSkill createMany
   */
  export type JobRequiredSkillCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JobRequiredSkills.
     */
    data: JobRequiredSkillCreateManyInput | JobRequiredSkillCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JobRequiredSkill update
   */
  export type JobRequiredSkillUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRequiredSkill
     */
    select?: JobRequiredSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRequiredSkill
     */
    omit?: JobRequiredSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRequiredSkillInclude<ExtArgs> | null
    /**
     * The data needed to update a JobRequiredSkill.
     */
    data: XOR<JobRequiredSkillUpdateInput, JobRequiredSkillUncheckedUpdateInput>
    /**
     * Choose, which JobRequiredSkill to update.
     */
    where: JobRequiredSkillWhereUniqueInput
  }

  /**
   * JobRequiredSkill updateMany
   */
  export type JobRequiredSkillUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JobRequiredSkills.
     */
    data: XOR<JobRequiredSkillUpdateManyMutationInput, JobRequiredSkillUncheckedUpdateManyInput>
    /**
     * Filter which JobRequiredSkills to update
     */
    where?: JobRequiredSkillWhereInput
    /**
     * Limit how many JobRequiredSkills to update.
     */
    limit?: number
  }

  /**
   * JobRequiredSkill upsert
   */
  export type JobRequiredSkillUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRequiredSkill
     */
    select?: JobRequiredSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRequiredSkill
     */
    omit?: JobRequiredSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRequiredSkillInclude<ExtArgs> | null
    /**
     * The filter to search for the JobRequiredSkill to update in case it exists.
     */
    where: JobRequiredSkillWhereUniqueInput
    /**
     * In case the JobRequiredSkill found by the `where` argument doesn't exist, create a new JobRequiredSkill with this data.
     */
    create: XOR<JobRequiredSkillCreateInput, JobRequiredSkillUncheckedCreateInput>
    /**
     * In case the JobRequiredSkill was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobRequiredSkillUpdateInput, JobRequiredSkillUncheckedUpdateInput>
  }

  /**
   * JobRequiredSkill delete
   */
  export type JobRequiredSkillDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRequiredSkill
     */
    select?: JobRequiredSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRequiredSkill
     */
    omit?: JobRequiredSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRequiredSkillInclude<ExtArgs> | null
    /**
     * Filter which JobRequiredSkill to delete.
     */
    where: JobRequiredSkillWhereUniqueInput
  }

  /**
   * JobRequiredSkill deleteMany
   */
  export type JobRequiredSkillDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobRequiredSkills to delete
     */
    where?: JobRequiredSkillWhereInput
    /**
     * Limit how many JobRequiredSkills to delete.
     */
    limit?: number
  }

  /**
   * JobRequiredSkill without action
   */
  export type JobRequiredSkillDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRequiredSkill
     */
    select?: JobRequiredSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRequiredSkill
     */
    omit?: JobRequiredSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRequiredSkillInclude<ExtArgs> | null
  }


  /**
   * Model JobSeeker
   */

  export type AggregateJobSeeker = {
    _count: JobSeekerCountAggregateOutputType | null
    _avg: JobSeekerAvgAggregateOutputType | null
    _sum: JobSeekerSumAggregateOutputType | null
    _min: JobSeekerMinAggregateOutputType | null
    _max: JobSeekerMaxAggregateOutputType | null
  }

  export type JobSeekerAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    experience_years: number | null
    desired_salary: number | null
  }

  export type JobSeekerSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    experience_years: number | null
    desired_salary: number | null
  }

  export type JobSeekerMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    resume_text: string | null
    resume_file_path: string | null
    education: string | null
    experience_years: number | null
    current_job_title: string | null
    desired_job_title: string | null
    desired_salary: number | null
    location_preference: string | null
  }

  export type JobSeekerMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    resume_text: string | null
    resume_file_path: string | null
    education: string | null
    experience_years: number | null
    current_job_title: string | null
    desired_job_title: string | null
    desired_salary: number | null
    location_preference: string | null
  }

  export type JobSeekerCountAggregateOutputType = {
    id: number
    user_id: number
    resume_text: number
    resume_file_path: number
    education: number
    experience_years: number
    current_job_title: number
    desired_job_title: number
    desired_salary: number
    location_preference: number
    _all: number
  }


  export type JobSeekerAvgAggregateInputType = {
    id?: true
    user_id?: true
    experience_years?: true
    desired_salary?: true
  }

  export type JobSeekerSumAggregateInputType = {
    id?: true
    user_id?: true
    experience_years?: true
    desired_salary?: true
  }

  export type JobSeekerMinAggregateInputType = {
    id?: true
    user_id?: true
    resume_text?: true
    resume_file_path?: true
    education?: true
    experience_years?: true
    current_job_title?: true
    desired_job_title?: true
    desired_salary?: true
    location_preference?: true
  }

  export type JobSeekerMaxAggregateInputType = {
    id?: true
    user_id?: true
    resume_text?: true
    resume_file_path?: true
    education?: true
    experience_years?: true
    current_job_title?: true
    desired_job_title?: true
    desired_salary?: true
    location_preference?: true
  }

  export type JobSeekerCountAggregateInputType = {
    id?: true
    user_id?: true
    resume_text?: true
    resume_file_path?: true
    education?: true
    experience_years?: true
    current_job_title?: true
    desired_job_title?: true
    desired_salary?: true
    location_preference?: true
    _all?: true
  }

  export type JobSeekerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobSeeker to aggregate.
     */
    where?: JobSeekerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobSeekers to fetch.
     */
    orderBy?: JobSeekerOrderByWithRelationInput | JobSeekerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobSeekerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobSeekers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobSeekers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JobSeekers
    **/
    _count?: true | JobSeekerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobSeekerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobSeekerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobSeekerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobSeekerMaxAggregateInputType
  }

  export type GetJobSeekerAggregateType<T extends JobSeekerAggregateArgs> = {
        [P in keyof T & keyof AggregateJobSeeker]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobSeeker[P]>
      : GetScalarType<T[P], AggregateJobSeeker[P]>
  }




  export type JobSeekerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobSeekerWhereInput
    orderBy?: JobSeekerOrderByWithAggregationInput | JobSeekerOrderByWithAggregationInput[]
    by: JobSeekerScalarFieldEnum[] | JobSeekerScalarFieldEnum
    having?: JobSeekerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobSeekerCountAggregateInputType | true
    _avg?: JobSeekerAvgAggregateInputType
    _sum?: JobSeekerSumAggregateInputType
    _min?: JobSeekerMinAggregateInputType
    _max?: JobSeekerMaxAggregateInputType
  }

  export type JobSeekerGroupByOutputType = {
    id: number
    user_id: number
    resume_text: string | null
    resume_file_path: string | null
    education: string | null
    experience_years: number | null
    current_job_title: string | null
    desired_job_title: string | null
    desired_salary: number | null
    location_preference: string | null
    _count: JobSeekerCountAggregateOutputType | null
    _avg: JobSeekerAvgAggregateOutputType | null
    _sum: JobSeekerSumAggregateOutputType | null
    _min: JobSeekerMinAggregateOutputType | null
    _max: JobSeekerMaxAggregateOutputType | null
  }

  type GetJobSeekerGroupByPayload<T extends JobSeekerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobSeekerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobSeekerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobSeekerGroupByOutputType[P]>
            : GetScalarType<T[P], JobSeekerGroupByOutputType[P]>
        }
      >
    >


  export type JobSeekerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    resume_text?: boolean
    resume_file_path?: boolean
    education?: boolean
    experience_years?: boolean
    current_job_title?: boolean
    desired_job_title?: boolean
    desired_salary?: boolean
    location_preference?: boolean
    applications?: boolean | JobSeeker$applicationsArgs<ExtArgs>
    skills?: boolean | JobSeeker$skillsArgs<ExtArgs>
    _count?: boolean | JobSeekerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobSeeker"]>



  export type JobSeekerSelectScalar = {
    id?: boolean
    user_id?: boolean
    resume_text?: boolean
    resume_file_path?: boolean
    education?: boolean
    experience_years?: boolean
    current_job_title?: boolean
    desired_job_title?: boolean
    desired_salary?: boolean
    location_preference?: boolean
  }

  export type JobSeekerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "resume_text" | "resume_file_path" | "education" | "experience_years" | "current_job_title" | "desired_job_title" | "desired_salary" | "location_preference", ExtArgs["result"]["jobSeeker"]>
  export type JobSeekerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | JobSeeker$applicationsArgs<ExtArgs>
    skills?: boolean | JobSeeker$skillsArgs<ExtArgs>
    _count?: boolean | JobSeekerCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $JobSeekerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobSeeker"
    objects: {
      applications: Prisma.$JobApplicationPayload<ExtArgs>[]
      skills: Prisma.$JobSeekerSkillPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      resume_text: string | null
      resume_file_path: string | null
      education: string | null
      experience_years: number | null
      current_job_title: string | null
      desired_job_title: string | null
      desired_salary: number | null
      location_preference: string | null
    }, ExtArgs["result"]["jobSeeker"]>
    composites: {}
  }

  type JobSeekerGetPayload<S extends boolean | null | undefined | JobSeekerDefaultArgs> = $Result.GetResult<Prisma.$JobSeekerPayload, S>

  type JobSeekerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobSeekerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobSeekerCountAggregateInputType | true
    }

  export interface JobSeekerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JobSeeker'], meta: { name: 'JobSeeker' } }
    /**
     * Find zero or one JobSeeker that matches the filter.
     * @param {JobSeekerFindUniqueArgs} args - Arguments to find a JobSeeker
     * @example
     * // Get one JobSeeker
     * const jobSeeker = await prisma.jobSeeker.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobSeekerFindUniqueArgs>(args: SelectSubset<T, JobSeekerFindUniqueArgs<ExtArgs>>): Prisma__JobSeekerClient<$Result.GetResult<Prisma.$JobSeekerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JobSeeker that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobSeekerFindUniqueOrThrowArgs} args - Arguments to find a JobSeeker
     * @example
     * // Get one JobSeeker
     * const jobSeeker = await prisma.jobSeeker.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobSeekerFindUniqueOrThrowArgs>(args: SelectSubset<T, JobSeekerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobSeekerClient<$Result.GetResult<Prisma.$JobSeekerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobSeeker that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSeekerFindFirstArgs} args - Arguments to find a JobSeeker
     * @example
     * // Get one JobSeeker
     * const jobSeeker = await prisma.jobSeeker.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobSeekerFindFirstArgs>(args?: SelectSubset<T, JobSeekerFindFirstArgs<ExtArgs>>): Prisma__JobSeekerClient<$Result.GetResult<Prisma.$JobSeekerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobSeeker that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSeekerFindFirstOrThrowArgs} args - Arguments to find a JobSeeker
     * @example
     * // Get one JobSeeker
     * const jobSeeker = await prisma.jobSeeker.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobSeekerFindFirstOrThrowArgs>(args?: SelectSubset<T, JobSeekerFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobSeekerClient<$Result.GetResult<Prisma.$JobSeekerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JobSeekers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSeekerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JobSeekers
     * const jobSeekers = await prisma.jobSeeker.findMany()
     * 
     * // Get first 10 JobSeekers
     * const jobSeekers = await prisma.jobSeeker.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobSeekerWithIdOnly = await prisma.jobSeeker.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobSeekerFindManyArgs>(args?: SelectSubset<T, JobSeekerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobSeekerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JobSeeker.
     * @param {JobSeekerCreateArgs} args - Arguments to create a JobSeeker.
     * @example
     * // Create one JobSeeker
     * const JobSeeker = await prisma.jobSeeker.create({
     *   data: {
     *     // ... data to create a JobSeeker
     *   }
     * })
     * 
     */
    create<T extends JobSeekerCreateArgs>(args: SelectSubset<T, JobSeekerCreateArgs<ExtArgs>>): Prisma__JobSeekerClient<$Result.GetResult<Prisma.$JobSeekerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JobSeekers.
     * @param {JobSeekerCreateManyArgs} args - Arguments to create many JobSeekers.
     * @example
     * // Create many JobSeekers
     * const jobSeeker = await prisma.jobSeeker.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobSeekerCreateManyArgs>(args?: SelectSubset<T, JobSeekerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a JobSeeker.
     * @param {JobSeekerDeleteArgs} args - Arguments to delete one JobSeeker.
     * @example
     * // Delete one JobSeeker
     * const JobSeeker = await prisma.jobSeeker.delete({
     *   where: {
     *     // ... filter to delete one JobSeeker
     *   }
     * })
     * 
     */
    delete<T extends JobSeekerDeleteArgs>(args: SelectSubset<T, JobSeekerDeleteArgs<ExtArgs>>): Prisma__JobSeekerClient<$Result.GetResult<Prisma.$JobSeekerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JobSeeker.
     * @param {JobSeekerUpdateArgs} args - Arguments to update one JobSeeker.
     * @example
     * // Update one JobSeeker
     * const jobSeeker = await prisma.jobSeeker.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobSeekerUpdateArgs>(args: SelectSubset<T, JobSeekerUpdateArgs<ExtArgs>>): Prisma__JobSeekerClient<$Result.GetResult<Prisma.$JobSeekerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JobSeekers.
     * @param {JobSeekerDeleteManyArgs} args - Arguments to filter JobSeekers to delete.
     * @example
     * // Delete a few JobSeekers
     * const { count } = await prisma.jobSeeker.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobSeekerDeleteManyArgs>(args?: SelectSubset<T, JobSeekerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobSeekers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSeekerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JobSeekers
     * const jobSeeker = await prisma.jobSeeker.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobSeekerUpdateManyArgs>(args: SelectSubset<T, JobSeekerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one JobSeeker.
     * @param {JobSeekerUpsertArgs} args - Arguments to update or create a JobSeeker.
     * @example
     * // Update or create a JobSeeker
     * const jobSeeker = await prisma.jobSeeker.upsert({
     *   create: {
     *     // ... data to create a JobSeeker
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JobSeeker we want to update
     *   }
     * })
     */
    upsert<T extends JobSeekerUpsertArgs>(args: SelectSubset<T, JobSeekerUpsertArgs<ExtArgs>>): Prisma__JobSeekerClient<$Result.GetResult<Prisma.$JobSeekerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JobSeekers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSeekerCountArgs} args - Arguments to filter JobSeekers to count.
     * @example
     * // Count the number of JobSeekers
     * const count = await prisma.jobSeeker.count({
     *   where: {
     *     // ... the filter for the JobSeekers we want to count
     *   }
     * })
    **/
    count<T extends JobSeekerCountArgs>(
      args?: Subset<T, JobSeekerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobSeekerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JobSeeker.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSeekerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JobSeekerAggregateArgs>(args: Subset<T, JobSeekerAggregateArgs>): Prisma.PrismaPromise<GetJobSeekerAggregateType<T>>

    /**
     * Group by JobSeeker.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSeekerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JobSeekerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobSeekerGroupByArgs['orderBy'] }
        : { orderBy?: JobSeekerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JobSeekerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobSeekerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JobSeeker model
   */
  readonly fields: JobSeekerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JobSeeker.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobSeekerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    applications<T extends JobSeeker$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, JobSeeker$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    skills<T extends JobSeeker$skillsArgs<ExtArgs> = {}>(args?: Subset<T, JobSeeker$skillsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobSeekerSkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JobSeeker model
   */
  interface JobSeekerFieldRefs {
    readonly id: FieldRef<"JobSeeker", 'Int'>
    readonly user_id: FieldRef<"JobSeeker", 'Int'>
    readonly resume_text: FieldRef<"JobSeeker", 'String'>
    readonly resume_file_path: FieldRef<"JobSeeker", 'String'>
    readonly education: FieldRef<"JobSeeker", 'String'>
    readonly experience_years: FieldRef<"JobSeeker", 'Int'>
    readonly current_job_title: FieldRef<"JobSeeker", 'String'>
    readonly desired_job_title: FieldRef<"JobSeeker", 'String'>
    readonly desired_salary: FieldRef<"JobSeeker", 'Float'>
    readonly location_preference: FieldRef<"JobSeeker", 'String'>
  }
    

  // Custom InputTypes
  /**
   * JobSeeker findUnique
   */
  export type JobSeekerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeeker
     */
    select?: JobSeekerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSeeker
     */
    omit?: JobSeekerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerInclude<ExtArgs> | null
    /**
     * Filter, which JobSeeker to fetch.
     */
    where: JobSeekerWhereUniqueInput
  }

  /**
   * JobSeeker findUniqueOrThrow
   */
  export type JobSeekerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeeker
     */
    select?: JobSeekerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSeeker
     */
    omit?: JobSeekerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerInclude<ExtArgs> | null
    /**
     * Filter, which JobSeeker to fetch.
     */
    where: JobSeekerWhereUniqueInput
  }

  /**
   * JobSeeker findFirst
   */
  export type JobSeekerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeeker
     */
    select?: JobSeekerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSeeker
     */
    omit?: JobSeekerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerInclude<ExtArgs> | null
    /**
     * Filter, which JobSeeker to fetch.
     */
    where?: JobSeekerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobSeekers to fetch.
     */
    orderBy?: JobSeekerOrderByWithRelationInput | JobSeekerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobSeekers.
     */
    cursor?: JobSeekerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobSeekers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobSeekers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobSeekers.
     */
    distinct?: JobSeekerScalarFieldEnum | JobSeekerScalarFieldEnum[]
  }

  /**
   * JobSeeker findFirstOrThrow
   */
  export type JobSeekerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeeker
     */
    select?: JobSeekerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSeeker
     */
    omit?: JobSeekerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerInclude<ExtArgs> | null
    /**
     * Filter, which JobSeeker to fetch.
     */
    where?: JobSeekerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobSeekers to fetch.
     */
    orderBy?: JobSeekerOrderByWithRelationInput | JobSeekerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobSeekers.
     */
    cursor?: JobSeekerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobSeekers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobSeekers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobSeekers.
     */
    distinct?: JobSeekerScalarFieldEnum | JobSeekerScalarFieldEnum[]
  }

  /**
   * JobSeeker findMany
   */
  export type JobSeekerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeeker
     */
    select?: JobSeekerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSeeker
     */
    omit?: JobSeekerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerInclude<ExtArgs> | null
    /**
     * Filter, which JobSeekers to fetch.
     */
    where?: JobSeekerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobSeekers to fetch.
     */
    orderBy?: JobSeekerOrderByWithRelationInput | JobSeekerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JobSeekers.
     */
    cursor?: JobSeekerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobSeekers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobSeekers.
     */
    skip?: number
    distinct?: JobSeekerScalarFieldEnum | JobSeekerScalarFieldEnum[]
  }

  /**
   * JobSeeker create
   */
  export type JobSeekerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeeker
     */
    select?: JobSeekerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSeeker
     */
    omit?: JobSeekerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerInclude<ExtArgs> | null
    /**
     * The data needed to create a JobSeeker.
     */
    data: XOR<JobSeekerCreateInput, JobSeekerUncheckedCreateInput>
  }

  /**
   * JobSeeker createMany
   */
  export type JobSeekerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JobSeekers.
     */
    data: JobSeekerCreateManyInput | JobSeekerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JobSeeker update
   */
  export type JobSeekerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeeker
     */
    select?: JobSeekerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSeeker
     */
    omit?: JobSeekerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerInclude<ExtArgs> | null
    /**
     * The data needed to update a JobSeeker.
     */
    data: XOR<JobSeekerUpdateInput, JobSeekerUncheckedUpdateInput>
    /**
     * Choose, which JobSeeker to update.
     */
    where: JobSeekerWhereUniqueInput
  }

  /**
   * JobSeeker updateMany
   */
  export type JobSeekerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JobSeekers.
     */
    data: XOR<JobSeekerUpdateManyMutationInput, JobSeekerUncheckedUpdateManyInput>
    /**
     * Filter which JobSeekers to update
     */
    where?: JobSeekerWhereInput
    /**
     * Limit how many JobSeekers to update.
     */
    limit?: number
  }

  /**
   * JobSeeker upsert
   */
  export type JobSeekerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeeker
     */
    select?: JobSeekerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSeeker
     */
    omit?: JobSeekerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerInclude<ExtArgs> | null
    /**
     * The filter to search for the JobSeeker to update in case it exists.
     */
    where: JobSeekerWhereUniqueInput
    /**
     * In case the JobSeeker found by the `where` argument doesn't exist, create a new JobSeeker with this data.
     */
    create: XOR<JobSeekerCreateInput, JobSeekerUncheckedCreateInput>
    /**
     * In case the JobSeeker was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobSeekerUpdateInput, JobSeekerUncheckedUpdateInput>
  }

  /**
   * JobSeeker delete
   */
  export type JobSeekerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeeker
     */
    select?: JobSeekerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSeeker
     */
    omit?: JobSeekerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerInclude<ExtArgs> | null
    /**
     * Filter which JobSeeker to delete.
     */
    where: JobSeekerWhereUniqueInput
  }

  /**
   * JobSeeker deleteMany
   */
  export type JobSeekerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobSeekers to delete
     */
    where?: JobSeekerWhereInput
    /**
     * Limit how many JobSeekers to delete.
     */
    limit?: number
  }

  /**
   * JobSeeker.applications
   */
  export type JobSeeker$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobApplication
     */
    select?: JobApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobApplication
     */
    omit?: JobApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobApplicationInclude<ExtArgs> | null
    where?: JobApplicationWhereInput
    orderBy?: JobApplicationOrderByWithRelationInput | JobApplicationOrderByWithRelationInput[]
    cursor?: JobApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobApplicationScalarFieldEnum | JobApplicationScalarFieldEnum[]
  }

  /**
   * JobSeeker.skills
   */
  export type JobSeeker$skillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeekerSkill
     */
    select?: JobSeekerSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSeekerSkill
     */
    omit?: JobSeekerSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerSkillInclude<ExtArgs> | null
    where?: JobSeekerSkillWhereInput
    orderBy?: JobSeekerSkillOrderByWithRelationInput | JobSeekerSkillOrderByWithRelationInput[]
    cursor?: JobSeekerSkillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobSeekerSkillScalarFieldEnum | JobSeekerSkillScalarFieldEnum[]
  }

  /**
   * JobSeeker without action
   */
  export type JobSeekerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeeker
     */
    select?: JobSeekerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSeeker
     */
    omit?: JobSeekerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerInclude<ExtArgs> | null
  }


  /**
   * Model JobSeekerSkill
   */

  export type AggregateJobSeekerSkill = {
    _count: JobSeekerSkillCountAggregateOutputType | null
    _avg: JobSeekerSkillAvgAggregateOutputType | null
    _sum: JobSeekerSkillSumAggregateOutputType | null
    _min: JobSeekerSkillMinAggregateOutputType | null
    _max: JobSeekerSkillMaxAggregateOutputType | null
  }

  export type JobSeekerSkillAvgAggregateOutputType = {
    id: number | null
    seeker_id: number | null
    skill_id: number | null
    proficiency_level: number | null
    years_of_experience: number | null
  }

  export type JobSeekerSkillSumAggregateOutputType = {
    id: number | null
    seeker_id: number | null
    skill_id: number | null
    proficiency_level: number | null
    years_of_experience: number | null
  }

  export type JobSeekerSkillMinAggregateOutputType = {
    id: number | null
    seeker_id: number | null
    skill_id: number | null
    proficiency_level: number | null
    years_of_experience: number | null
  }

  export type JobSeekerSkillMaxAggregateOutputType = {
    id: number | null
    seeker_id: number | null
    skill_id: number | null
    proficiency_level: number | null
    years_of_experience: number | null
  }

  export type JobSeekerSkillCountAggregateOutputType = {
    id: number
    seeker_id: number
    skill_id: number
    proficiency_level: number
    years_of_experience: number
    _all: number
  }


  export type JobSeekerSkillAvgAggregateInputType = {
    id?: true
    seeker_id?: true
    skill_id?: true
    proficiency_level?: true
    years_of_experience?: true
  }

  export type JobSeekerSkillSumAggregateInputType = {
    id?: true
    seeker_id?: true
    skill_id?: true
    proficiency_level?: true
    years_of_experience?: true
  }

  export type JobSeekerSkillMinAggregateInputType = {
    id?: true
    seeker_id?: true
    skill_id?: true
    proficiency_level?: true
    years_of_experience?: true
  }

  export type JobSeekerSkillMaxAggregateInputType = {
    id?: true
    seeker_id?: true
    skill_id?: true
    proficiency_level?: true
    years_of_experience?: true
  }

  export type JobSeekerSkillCountAggregateInputType = {
    id?: true
    seeker_id?: true
    skill_id?: true
    proficiency_level?: true
    years_of_experience?: true
    _all?: true
  }

  export type JobSeekerSkillAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobSeekerSkill to aggregate.
     */
    where?: JobSeekerSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobSeekerSkills to fetch.
     */
    orderBy?: JobSeekerSkillOrderByWithRelationInput | JobSeekerSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobSeekerSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobSeekerSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobSeekerSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JobSeekerSkills
    **/
    _count?: true | JobSeekerSkillCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobSeekerSkillAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobSeekerSkillSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobSeekerSkillMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobSeekerSkillMaxAggregateInputType
  }

  export type GetJobSeekerSkillAggregateType<T extends JobSeekerSkillAggregateArgs> = {
        [P in keyof T & keyof AggregateJobSeekerSkill]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJobSeekerSkill[P]>
      : GetScalarType<T[P], AggregateJobSeekerSkill[P]>
  }




  export type JobSeekerSkillGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobSeekerSkillWhereInput
    orderBy?: JobSeekerSkillOrderByWithAggregationInput | JobSeekerSkillOrderByWithAggregationInput[]
    by: JobSeekerSkillScalarFieldEnum[] | JobSeekerSkillScalarFieldEnum
    having?: JobSeekerSkillScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobSeekerSkillCountAggregateInputType | true
    _avg?: JobSeekerSkillAvgAggregateInputType
    _sum?: JobSeekerSkillSumAggregateInputType
    _min?: JobSeekerSkillMinAggregateInputType
    _max?: JobSeekerSkillMaxAggregateInputType
  }

  export type JobSeekerSkillGroupByOutputType = {
    id: number
    seeker_id: number
    skill_id: number
    proficiency_level: number | null
    years_of_experience: number | null
    _count: JobSeekerSkillCountAggregateOutputType | null
    _avg: JobSeekerSkillAvgAggregateOutputType | null
    _sum: JobSeekerSkillSumAggregateOutputType | null
    _min: JobSeekerSkillMinAggregateOutputType | null
    _max: JobSeekerSkillMaxAggregateOutputType | null
  }

  type GetJobSeekerSkillGroupByPayload<T extends JobSeekerSkillGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobSeekerSkillGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobSeekerSkillGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobSeekerSkillGroupByOutputType[P]>
            : GetScalarType<T[P], JobSeekerSkillGroupByOutputType[P]>
        }
      >
    >


  export type JobSeekerSkillSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    seeker_id?: boolean
    skill_id?: boolean
    proficiency_level?: boolean
    years_of_experience?: boolean
    seeker?: boolean | JobSeekerDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobSeekerSkill"]>



  export type JobSeekerSkillSelectScalar = {
    id?: boolean
    seeker_id?: boolean
    skill_id?: boolean
    proficiency_level?: boolean
    years_of_experience?: boolean
  }

  export type JobSeekerSkillOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "seeker_id" | "skill_id" | "proficiency_level" | "years_of_experience", ExtArgs["result"]["jobSeekerSkill"]>
  export type JobSeekerSkillInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seeker?: boolean | JobSeekerDefaultArgs<ExtArgs>
    skill?: boolean | SkillDefaultArgs<ExtArgs>
  }

  export type $JobSeekerSkillPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobSeekerSkill"
    objects: {
      seeker: Prisma.$JobSeekerPayload<ExtArgs>
      skill: Prisma.$SkillPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      seeker_id: number
      skill_id: number
      proficiency_level: number | null
      years_of_experience: number | null
    }, ExtArgs["result"]["jobSeekerSkill"]>
    composites: {}
  }

  type JobSeekerSkillGetPayload<S extends boolean | null | undefined | JobSeekerSkillDefaultArgs> = $Result.GetResult<Prisma.$JobSeekerSkillPayload, S>

  type JobSeekerSkillCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobSeekerSkillFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobSeekerSkillCountAggregateInputType | true
    }

  export interface JobSeekerSkillDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JobSeekerSkill'], meta: { name: 'JobSeekerSkill' } }
    /**
     * Find zero or one JobSeekerSkill that matches the filter.
     * @param {JobSeekerSkillFindUniqueArgs} args - Arguments to find a JobSeekerSkill
     * @example
     * // Get one JobSeekerSkill
     * const jobSeekerSkill = await prisma.jobSeekerSkill.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobSeekerSkillFindUniqueArgs>(args: SelectSubset<T, JobSeekerSkillFindUniqueArgs<ExtArgs>>): Prisma__JobSeekerSkillClient<$Result.GetResult<Prisma.$JobSeekerSkillPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JobSeekerSkill that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobSeekerSkillFindUniqueOrThrowArgs} args - Arguments to find a JobSeekerSkill
     * @example
     * // Get one JobSeekerSkill
     * const jobSeekerSkill = await prisma.jobSeekerSkill.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobSeekerSkillFindUniqueOrThrowArgs>(args: SelectSubset<T, JobSeekerSkillFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobSeekerSkillClient<$Result.GetResult<Prisma.$JobSeekerSkillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobSeekerSkill that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSeekerSkillFindFirstArgs} args - Arguments to find a JobSeekerSkill
     * @example
     * // Get one JobSeekerSkill
     * const jobSeekerSkill = await prisma.jobSeekerSkill.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobSeekerSkillFindFirstArgs>(args?: SelectSubset<T, JobSeekerSkillFindFirstArgs<ExtArgs>>): Prisma__JobSeekerSkillClient<$Result.GetResult<Prisma.$JobSeekerSkillPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JobSeekerSkill that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSeekerSkillFindFirstOrThrowArgs} args - Arguments to find a JobSeekerSkill
     * @example
     * // Get one JobSeekerSkill
     * const jobSeekerSkill = await prisma.jobSeekerSkill.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobSeekerSkillFindFirstOrThrowArgs>(args?: SelectSubset<T, JobSeekerSkillFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobSeekerSkillClient<$Result.GetResult<Prisma.$JobSeekerSkillPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JobSeekerSkills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSeekerSkillFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JobSeekerSkills
     * const jobSeekerSkills = await prisma.jobSeekerSkill.findMany()
     * 
     * // Get first 10 JobSeekerSkills
     * const jobSeekerSkills = await prisma.jobSeekerSkill.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobSeekerSkillWithIdOnly = await prisma.jobSeekerSkill.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobSeekerSkillFindManyArgs>(args?: SelectSubset<T, JobSeekerSkillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobSeekerSkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JobSeekerSkill.
     * @param {JobSeekerSkillCreateArgs} args - Arguments to create a JobSeekerSkill.
     * @example
     * // Create one JobSeekerSkill
     * const JobSeekerSkill = await prisma.jobSeekerSkill.create({
     *   data: {
     *     // ... data to create a JobSeekerSkill
     *   }
     * })
     * 
     */
    create<T extends JobSeekerSkillCreateArgs>(args: SelectSubset<T, JobSeekerSkillCreateArgs<ExtArgs>>): Prisma__JobSeekerSkillClient<$Result.GetResult<Prisma.$JobSeekerSkillPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JobSeekerSkills.
     * @param {JobSeekerSkillCreateManyArgs} args - Arguments to create many JobSeekerSkills.
     * @example
     * // Create many JobSeekerSkills
     * const jobSeekerSkill = await prisma.jobSeekerSkill.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobSeekerSkillCreateManyArgs>(args?: SelectSubset<T, JobSeekerSkillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a JobSeekerSkill.
     * @param {JobSeekerSkillDeleteArgs} args - Arguments to delete one JobSeekerSkill.
     * @example
     * // Delete one JobSeekerSkill
     * const JobSeekerSkill = await prisma.jobSeekerSkill.delete({
     *   where: {
     *     // ... filter to delete one JobSeekerSkill
     *   }
     * })
     * 
     */
    delete<T extends JobSeekerSkillDeleteArgs>(args: SelectSubset<T, JobSeekerSkillDeleteArgs<ExtArgs>>): Prisma__JobSeekerSkillClient<$Result.GetResult<Prisma.$JobSeekerSkillPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JobSeekerSkill.
     * @param {JobSeekerSkillUpdateArgs} args - Arguments to update one JobSeekerSkill.
     * @example
     * // Update one JobSeekerSkill
     * const jobSeekerSkill = await prisma.jobSeekerSkill.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobSeekerSkillUpdateArgs>(args: SelectSubset<T, JobSeekerSkillUpdateArgs<ExtArgs>>): Prisma__JobSeekerSkillClient<$Result.GetResult<Prisma.$JobSeekerSkillPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JobSeekerSkills.
     * @param {JobSeekerSkillDeleteManyArgs} args - Arguments to filter JobSeekerSkills to delete.
     * @example
     * // Delete a few JobSeekerSkills
     * const { count } = await prisma.jobSeekerSkill.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobSeekerSkillDeleteManyArgs>(args?: SelectSubset<T, JobSeekerSkillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JobSeekerSkills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSeekerSkillUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JobSeekerSkills
     * const jobSeekerSkill = await prisma.jobSeekerSkill.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobSeekerSkillUpdateManyArgs>(args: SelectSubset<T, JobSeekerSkillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one JobSeekerSkill.
     * @param {JobSeekerSkillUpsertArgs} args - Arguments to update or create a JobSeekerSkill.
     * @example
     * // Update or create a JobSeekerSkill
     * const jobSeekerSkill = await prisma.jobSeekerSkill.upsert({
     *   create: {
     *     // ... data to create a JobSeekerSkill
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JobSeekerSkill we want to update
     *   }
     * })
     */
    upsert<T extends JobSeekerSkillUpsertArgs>(args: SelectSubset<T, JobSeekerSkillUpsertArgs<ExtArgs>>): Prisma__JobSeekerSkillClient<$Result.GetResult<Prisma.$JobSeekerSkillPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JobSeekerSkills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSeekerSkillCountArgs} args - Arguments to filter JobSeekerSkills to count.
     * @example
     * // Count the number of JobSeekerSkills
     * const count = await prisma.jobSeekerSkill.count({
     *   where: {
     *     // ... the filter for the JobSeekerSkills we want to count
     *   }
     * })
    **/
    count<T extends JobSeekerSkillCountArgs>(
      args?: Subset<T, JobSeekerSkillCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobSeekerSkillCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JobSeekerSkill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSeekerSkillAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JobSeekerSkillAggregateArgs>(args: Subset<T, JobSeekerSkillAggregateArgs>): Prisma.PrismaPromise<GetJobSeekerSkillAggregateType<T>>

    /**
     * Group by JobSeekerSkill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobSeekerSkillGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JobSeekerSkillGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobSeekerSkillGroupByArgs['orderBy'] }
        : { orderBy?: JobSeekerSkillGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JobSeekerSkillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobSeekerSkillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JobSeekerSkill model
   */
  readonly fields: JobSeekerSkillFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JobSeekerSkill.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobSeekerSkillClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    seeker<T extends JobSeekerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JobSeekerDefaultArgs<ExtArgs>>): Prisma__JobSeekerClient<$Result.GetResult<Prisma.$JobSeekerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    skill<T extends SkillDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SkillDefaultArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JobSeekerSkill model
   */
  interface JobSeekerSkillFieldRefs {
    readonly id: FieldRef<"JobSeekerSkill", 'Int'>
    readonly seeker_id: FieldRef<"JobSeekerSkill", 'Int'>
    readonly skill_id: FieldRef<"JobSeekerSkill", 'Int'>
    readonly proficiency_level: FieldRef<"JobSeekerSkill", 'Int'>
    readonly years_of_experience: FieldRef<"JobSeekerSkill", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * JobSeekerSkill findUnique
   */
  export type JobSeekerSkillFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeekerSkill
     */
    select?: JobSeekerSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSeekerSkill
     */
    omit?: JobSeekerSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerSkillInclude<ExtArgs> | null
    /**
     * Filter, which JobSeekerSkill to fetch.
     */
    where: JobSeekerSkillWhereUniqueInput
  }

  /**
   * JobSeekerSkill findUniqueOrThrow
   */
  export type JobSeekerSkillFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeekerSkill
     */
    select?: JobSeekerSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSeekerSkill
     */
    omit?: JobSeekerSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerSkillInclude<ExtArgs> | null
    /**
     * Filter, which JobSeekerSkill to fetch.
     */
    where: JobSeekerSkillWhereUniqueInput
  }

  /**
   * JobSeekerSkill findFirst
   */
  export type JobSeekerSkillFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeekerSkill
     */
    select?: JobSeekerSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSeekerSkill
     */
    omit?: JobSeekerSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerSkillInclude<ExtArgs> | null
    /**
     * Filter, which JobSeekerSkill to fetch.
     */
    where?: JobSeekerSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobSeekerSkills to fetch.
     */
    orderBy?: JobSeekerSkillOrderByWithRelationInput | JobSeekerSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobSeekerSkills.
     */
    cursor?: JobSeekerSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobSeekerSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobSeekerSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobSeekerSkills.
     */
    distinct?: JobSeekerSkillScalarFieldEnum | JobSeekerSkillScalarFieldEnum[]
  }

  /**
   * JobSeekerSkill findFirstOrThrow
   */
  export type JobSeekerSkillFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeekerSkill
     */
    select?: JobSeekerSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSeekerSkill
     */
    omit?: JobSeekerSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerSkillInclude<ExtArgs> | null
    /**
     * Filter, which JobSeekerSkill to fetch.
     */
    where?: JobSeekerSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobSeekerSkills to fetch.
     */
    orderBy?: JobSeekerSkillOrderByWithRelationInput | JobSeekerSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JobSeekerSkills.
     */
    cursor?: JobSeekerSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobSeekerSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobSeekerSkills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JobSeekerSkills.
     */
    distinct?: JobSeekerSkillScalarFieldEnum | JobSeekerSkillScalarFieldEnum[]
  }

  /**
   * JobSeekerSkill findMany
   */
  export type JobSeekerSkillFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeekerSkill
     */
    select?: JobSeekerSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSeekerSkill
     */
    omit?: JobSeekerSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerSkillInclude<ExtArgs> | null
    /**
     * Filter, which JobSeekerSkills to fetch.
     */
    where?: JobSeekerSkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JobSeekerSkills to fetch.
     */
    orderBy?: JobSeekerSkillOrderByWithRelationInput | JobSeekerSkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JobSeekerSkills.
     */
    cursor?: JobSeekerSkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JobSeekerSkills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JobSeekerSkills.
     */
    skip?: number
    distinct?: JobSeekerSkillScalarFieldEnum | JobSeekerSkillScalarFieldEnum[]
  }

  /**
   * JobSeekerSkill create
   */
  export type JobSeekerSkillCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeekerSkill
     */
    select?: JobSeekerSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSeekerSkill
     */
    omit?: JobSeekerSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerSkillInclude<ExtArgs> | null
    /**
     * The data needed to create a JobSeekerSkill.
     */
    data: XOR<JobSeekerSkillCreateInput, JobSeekerSkillUncheckedCreateInput>
  }

  /**
   * JobSeekerSkill createMany
   */
  export type JobSeekerSkillCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JobSeekerSkills.
     */
    data: JobSeekerSkillCreateManyInput | JobSeekerSkillCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JobSeekerSkill update
   */
  export type JobSeekerSkillUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeekerSkill
     */
    select?: JobSeekerSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSeekerSkill
     */
    omit?: JobSeekerSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerSkillInclude<ExtArgs> | null
    /**
     * The data needed to update a JobSeekerSkill.
     */
    data: XOR<JobSeekerSkillUpdateInput, JobSeekerSkillUncheckedUpdateInput>
    /**
     * Choose, which JobSeekerSkill to update.
     */
    where: JobSeekerSkillWhereUniqueInput
  }

  /**
   * JobSeekerSkill updateMany
   */
  export type JobSeekerSkillUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JobSeekerSkills.
     */
    data: XOR<JobSeekerSkillUpdateManyMutationInput, JobSeekerSkillUncheckedUpdateManyInput>
    /**
     * Filter which JobSeekerSkills to update
     */
    where?: JobSeekerSkillWhereInput
    /**
     * Limit how many JobSeekerSkills to update.
     */
    limit?: number
  }

  /**
   * JobSeekerSkill upsert
   */
  export type JobSeekerSkillUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeekerSkill
     */
    select?: JobSeekerSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSeekerSkill
     */
    omit?: JobSeekerSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerSkillInclude<ExtArgs> | null
    /**
     * The filter to search for the JobSeekerSkill to update in case it exists.
     */
    where: JobSeekerSkillWhereUniqueInput
    /**
     * In case the JobSeekerSkill found by the `where` argument doesn't exist, create a new JobSeekerSkill with this data.
     */
    create: XOR<JobSeekerSkillCreateInput, JobSeekerSkillUncheckedCreateInput>
    /**
     * In case the JobSeekerSkill was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobSeekerSkillUpdateInput, JobSeekerSkillUncheckedUpdateInput>
  }

  /**
   * JobSeekerSkill delete
   */
  export type JobSeekerSkillDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeekerSkill
     */
    select?: JobSeekerSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSeekerSkill
     */
    omit?: JobSeekerSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerSkillInclude<ExtArgs> | null
    /**
     * Filter which JobSeekerSkill to delete.
     */
    where: JobSeekerSkillWhereUniqueInput
  }

  /**
   * JobSeekerSkill deleteMany
   */
  export type JobSeekerSkillDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JobSeekerSkills to delete
     */
    where?: JobSeekerSkillWhereInput
    /**
     * Limit how many JobSeekerSkills to delete.
     */
    limit?: number
  }

  /**
   * JobSeekerSkill without action
   */
  export type JobSeekerSkillDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeekerSkill
     */
    select?: JobSeekerSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSeekerSkill
     */
    omit?: JobSeekerSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerSkillInclude<ExtArgs> | null
  }


  /**
   * Model SavedJob
   */

  export type AggregateSavedJob = {
    _count: SavedJobCountAggregateOutputType | null
    _avg: SavedJobAvgAggregateOutputType | null
    _sum: SavedJobSumAggregateOutputType | null
    _min: SavedJobMinAggregateOutputType | null
    _max: SavedJobMaxAggregateOutputType | null
  }

  export type SavedJobAvgAggregateOutputType = {
    id: number | null
    seeker_id: number | null
    job_id: number | null
  }

  export type SavedJobSumAggregateOutputType = {
    id: number | null
    seeker_id: number | null
    job_id: number | null
  }

  export type SavedJobMinAggregateOutputType = {
    id: number | null
    seeker_id: number | null
    job_id: number | null
    saved_date: Date | null
    notes: string | null
  }

  export type SavedJobMaxAggregateOutputType = {
    id: number | null
    seeker_id: number | null
    job_id: number | null
    saved_date: Date | null
    notes: string | null
  }

  export type SavedJobCountAggregateOutputType = {
    id: number
    seeker_id: number
    job_id: number
    saved_date: number
    notes: number
    _all: number
  }


  export type SavedJobAvgAggregateInputType = {
    id?: true
    seeker_id?: true
    job_id?: true
  }

  export type SavedJobSumAggregateInputType = {
    id?: true
    seeker_id?: true
    job_id?: true
  }

  export type SavedJobMinAggregateInputType = {
    id?: true
    seeker_id?: true
    job_id?: true
    saved_date?: true
    notes?: true
  }

  export type SavedJobMaxAggregateInputType = {
    id?: true
    seeker_id?: true
    job_id?: true
    saved_date?: true
    notes?: true
  }

  export type SavedJobCountAggregateInputType = {
    id?: true
    seeker_id?: true
    job_id?: true
    saved_date?: true
    notes?: true
    _all?: true
  }

  export type SavedJobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SavedJob to aggregate.
     */
    where?: SavedJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedJobs to fetch.
     */
    orderBy?: SavedJobOrderByWithRelationInput | SavedJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SavedJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SavedJobs
    **/
    _count?: true | SavedJobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SavedJobAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SavedJobSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SavedJobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SavedJobMaxAggregateInputType
  }

  export type GetSavedJobAggregateType<T extends SavedJobAggregateArgs> = {
        [P in keyof T & keyof AggregateSavedJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSavedJob[P]>
      : GetScalarType<T[P], AggregateSavedJob[P]>
  }




  export type SavedJobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedJobWhereInput
    orderBy?: SavedJobOrderByWithAggregationInput | SavedJobOrderByWithAggregationInput[]
    by: SavedJobScalarFieldEnum[] | SavedJobScalarFieldEnum
    having?: SavedJobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SavedJobCountAggregateInputType | true
    _avg?: SavedJobAvgAggregateInputType
    _sum?: SavedJobSumAggregateInputType
    _min?: SavedJobMinAggregateInputType
    _max?: SavedJobMaxAggregateInputType
  }

  export type SavedJobGroupByOutputType = {
    id: number
    seeker_id: number
    job_id: number
    saved_date: Date
    notes: string | null
    _count: SavedJobCountAggregateOutputType | null
    _avg: SavedJobAvgAggregateOutputType | null
    _sum: SavedJobSumAggregateOutputType | null
    _min: SavedJobMinAggregateOutputType | null
    _max: SavedJobMaxAggregateOutputType | null
  }

  type GetSavedJobGroupByPayload<T extends SavedJobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SavedJobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SavedJobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SavedJobGroupByOutputType[P]>
            : GetScalarType<T[P], SavedJobGroupByOutputType[P]>
        }
      >
    >


  export type SavedJobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    seeker_id?: boolean
    job_id?: boolean
    saved_date?: boolean
    notes?: boolean
  }, ExtArgs["result"]["savedJob"]>



  export type SavedJobSelectScalar = {
    id?: boolean
    seeker_id?: boolean
    job_id?: boolean
    saved_date?: boolean
    notes?: boolean
  }

  export type SavedJobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "seeker_id" | "job_id" | "saved_date" | "notes", ExtArgs["result"]["savedJob"]>

  export type $SavedJobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SavedJob"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      seeker_id: number
      job_id: number
      saved_date: Date
      notes: string | null
    }, ExtArgs["result"]["savedJob"]>
    composites: {}
  }

  type SavedJobGetPayload<S extends boolean | null | undefined | SavedJobDefaultArgs> = $Result.GetResult<Prisma.$SavedJobPayload, S>

  type SavedJobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SavedJobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SavedJobCountAggregateInputType | true
    }

  export interface SavedJobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SavedJob'], meta: { name: 'SavedJob' } }
    /**
     * Find zero or one SavedJob that matches the filter.
     * @param {SavedJobFindUniqueArgs} args - Arguments to find a SavedJob
     * @example
     * // Get one SavedJob
     * const savedJob = await prisma.savedJob.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SavedJobFindUniqueArgs>(args: SelectSubset<T, SavedJobFindUniqueArgs<ExtArgs>>): Prisma__SavedJobClient<$Result.GetResult<Prisma.$SavedJobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SavedJob that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SavedJobFindUniqueOrThrowArgs} args - Arguments to find a SavedJob
     * @example
     * // Get one SavedJob
     * const savedJob = await prisma.savedJob.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SavedJobFindUniqueOrThrowArgs>(args: SelectSubset<T, SavedJobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SavedJobClient<$Result.GetResult<Prisma.$SavedJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SavedJob that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedJobFindFirstArgs} args - Arguments to find a SavedJob
     * @example
     * // Get one SavedJob
     * const savedJob = await prisma.savedJob.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SavedJobFindFirstArgs>(args?: SelectSubset<T, SavedJobFindFirstArgs<ExtArgs>>): Prisma__SavedJobClient<$Result.GetResult<Prisma.$SavedJobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SavedJob that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedJobFindFirstOrThrowArgs} args - Arguments to find a SavedJob
     * @example
     * // Get one SavedJob
     * const savedJob = await prisma.savedJob.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SavedJobFindFirstOrThrowArgs>(args?: SelectSubset<T, SavedJobFindFirstOrThrowArgs<ExtArgs>>): Prisma__SavedJobClient<$Result.GetResult<Prisma.$SavedJobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SavedJobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedJobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SavedJobs
     * const savedJobs = await prisma.savedJob.findMany()
     * 
     * // Get first 10 SavedJobs
     * const savedJobs = await prisma.savedJob.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const savedJobWithIdOnly = await prisma.savedJob.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SavedJobFindManyArgs>(args?: SelectSubset<T, SavedJobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SavedJob.
     * @param {SavedJobCreateArgs} args - Arguments to create a SavedJob.
     * @example
     * // Create one SavedJob
     * const SavedJob = await prisma.savedJob.create({
     *   data: {
     *     // ... data to create a SavedJob
     *   }
     * })
     * 
     */
    create<T extends SavedJobCreateArgs>(args: SelectSubset<T, SavedJobCreateArgs<ExtArgs>>): Prisma__SavedJobClient<$Result.GetResult<Prisma.$SavedJobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SavedJobs.
     * @param {SavedJobCreateManyArgs} args - Arguments to create many SavedJobs.
     * @example
     * // Create many SavedJobs
     * const savedJob = await prisma.savedJob.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SavedJobCreateManyArgs>(args?: SelectSubset<T, SavedJobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SavedJob.
     * @param {SavedJobDeleteArgs} args - Arguments to delete one SavedJob.
     * @example
     * // Delete one SavedJob
     * const SavedJob = await prisma.savedJob.delete({
     *   where: {
     *     // ... filter to delete one SavedJob
     *   }
     * })
     * 
     */
    delete<T extends SavedJobDeleteArgs>(args: SelectSubset<T, SavedJobDeleteArgs<ExtArgs>>): Prisma__SavedJobClient<$Result.GetResult<Prisma.$SavedJobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SavedJob.
     * @param {SavedJobUpdateArgs} args - Arguments to update one SavedJob.
     * @example
     * // Update one SavedJob
     * const savedJob = await prisma.savedJob.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SavedJobUpdateArgs>(args: SelectSubset<T, SavedJobUpdateArgs<ExtArgs>>): Prisma__SavedJobClient<$Result.GetResult<Prisma.$SavedJobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SavedJobs.
     * @param {SavedJobDeleteManyArgs} args - Arguments to filter SavedJobs to delete.
     * @example
     * // Delete a few SavedJobs
     * const { count } = await prisma.savedJob.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SavedJobDeleteManyArgs>(args?: SelectSubset<T, SavedJobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SavedJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedJobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SavedJobs
     * const savedJob = await prisma.savedJob.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SavedJobUpdateManyArgs>(args: SelectSubset<T, SavedJobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SavedJob.
     * @param {SavedJobUpsertArgs} args - Arguments to update or create a SavedJob.
     * @example
     * // Update or create a SavedJob
     * const savedJob = await prisma.savedJob.upsert({
     *   create: {
     *     // ... data to create a SavedJob
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SavedJob we want to update
     *   }
     * })
     */
    upsert<T extends SavedJobUpsertArgs>(args: SelectSubset<T, SavedJobUpsertArgs<ExtArgs>>): Prisma__SavedJobClient<$Result.GetResult<Prisma.$SavedJobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SavedJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedJobCountArgs} args - Arguments to filter SavedJobs to count.
     * @example
     * // Count the number of SavedJobs
     * const count = await prisma.savedJob.count({
     *   where: {
     *     // ... the filter for the SavedJobs we want to count
     *   }
     * })
    **/
    count<T extends SavedJobCountArgs>(
      args?: Subset<T, SavedJobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SavedJobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SavedJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedJobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SavedJobAggregateArgs>(args: Subset<T, SavedJobAggregateArgs>): Prisma.PrismaPromise<GetSavedJobAggregateType<T>>

    /**
     * Group by SavedJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedJobGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SavedJobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SavedJobGroupByArgs['orderBy'] }
        : { orderBy?: SavedJobGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SavedJobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSavedJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SavedJob model
   */
  readonly fields: SavedJobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SavedJob.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SavedJobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SavedJob model
   */
  interface SavedJobFieldRefs {
    readonly id: FieldRef<"SavedJob", 'Int'>
    readonly seeker_id: FieldRef<"SavedJob", 'Int'>
    readonly job_id: FieldRef<"SavedJob", 'Int'>
    readonly saved_date: FieldRef<"SavedJob", 'DateTime'>
    readonly notes: FieldRef<"SavedJob", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SavedJob findUnique
   */
  export type SavedJobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedJob
     */
    select?: SavedJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedJob
     */
    omit?: SavedJobOmit<ExtArgs> | null
    /**
     * Filter, which SavedJob to fetch.
     */
    where: SavedJobWhereUniqueInput
  }

  /**
   * SavedJob findUniqueOrThrow
   */
  export type SavedJobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedJob
     */
    select?: SavedJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedJob
     */
    omit?: SavedJobOmit<ExtArgs> | null
    /**
     * Filter, which SavedJob to fetch.
     */
    where: SavedJobWhereUniqueInput
  }

  /**
   * SavedJob findFirst
   */
  export type SavedJobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedJob
     */
    select?: SavedJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedJob
     */
    omit?: SavedJobOmit<ExtArgs> | null
    /**
     * Filter, which SavedJob to fetch.
     */
    where?: SavedJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedJobs to fetch.
     */
    orderBy?: SavedJobOrderByWithRelationInput | SavedJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SavedJobs.
     */
    cursor?: SavedJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedJobs.
     */
    distinct?: SavedJobScalarFieldEnum | SavedJobScalarFieldEnum[]
  }

  /**
   * SavedJob findFirstOrThrow
   */
  export type SavedJobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedJob
     */
    select?: SavedJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedJob
     */
    omit?: SavedJobOmit<ExtArgs> | null
    /**
     * Filter, which SavedJob to fetch.
     */
    where?: SavedJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedJobs to fetch.
     */
    orderBy?: SavedJobOrderByWithRelationInput | SavedJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SavedJobs.
     */
    cursor?: SavedJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedJobs.
     */
    distinct?: SavedJobScalarFieldEnum | SavedJobScalarFieldEnum[]
  }

  /**
   * SavedJob findMany
   */
  export type SavedJobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedJob
     */
    select?: SavedJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedJob
     */
    omit?: SavedJobOmit<ExtArgs> | null
    /**
     * Filter, which SavedJobs to fetch.
     */
    where?: SavedJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedJobs to fetch.
     */
    orderBy?: SavedJobOrderByWithRelationInput | SavedJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SavedJobs.
     */
    cursor?: SavedJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedJobs.
     */
    skip?: number
    distinct?: SavedJobScalarFieldEnum | SavedJobScalarFieldEnum[]
  }

  /**
   * SavedJob create
   */
  export type SavedJobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedJob
     */
    select?: SavedJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedJob
     */
    omit?: SavedJobOmit<ExtArgs> | null
    /**
     * The data needed to create a SavedJob.
     */
    data: XOR<SavedJobCreateInput, SavedJobUncheckedCreateInput>
  }

  /**
   * SavedJob createMany
   */
  export type SavedJobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SavedJobs.
     */
    data: SavedJobCreateManyInput | SavedJobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SavedJob update
   */
  export type SavedJobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedJob
     */
    select?: SavedJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedJob
     */
    omit?: SavedJobOmit<ExtArgs> | null
    /**
     * The data needed to update a SavedJob.
     */
    data: XOR<SavedJobUpdateInput, SavedJobUncheckedUpdateInput>
    /**
     * Choose, which SavedJob to update.
     */
    where: SavedJobWhereUniqueInput
  }

  /**
   * SavedJob updateMany
   */
  export type SavedJobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SavedJobs.
     */
    data: XOR<SavedJobUpdateManyMutationInput, SavedJobUncheckedUpdateManyInput>
    /**
     * Filter which SavedJobs to update
     */
    where?: SavedJobWhereInput
    /**
     * Limit how many SavedJobs to update.
     */
    limit?: number
  }

  /**
   * SavedJob upsert
   */
  export type SavedJobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedJob
     */
    select?: SavedJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedJob
     */
    omit?: SavedJobOmit<ExtArgs> | null
    /**
     * The filter to search for the SavedJob to update in case it exists.
     */
    where: SavedJobWhereUniqueInput
    /**
     * In case the SavedJob found by the `where` argument doesn't exist, create a new SavedJob with this data.
     */
    create: XOR<SavedJobCreateInput, SavedJobUncheckedCreateInput>
    /**
     * In case the SavedJob was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SavedJobUpdateInput, SavedJobUncheckedUpdateInput>
  }

  /**
   * SavedJob delete
   */
  export type SavedJobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedJob
     */
    select?: SavedJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedJob
     */
    omit?: SavedJobOmit<ExtArgs> | null
    /**
     * Filter which SavedJob to delete.
     */
    where: SavedJobWhereUniqueInput
  }

  /**
   * SavedJob deleteMany
   */
  export type SavedJobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SavedJobs to delete
     */
    where?: SavedJobWhereInput
    /**
     * Limit how many SavedJobs to delete.
     */
    limit?: number
  }

  /**
   * SavedJob without action
   */
  export type SavedJobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedJob
     */
    select?: SavedJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedJob
     */
    omit?: SavedJobOmit<ExtArgs> | null
  }


  /**
   * Model Skill
   */

  export type AggregateSkill = {
    _count: SkillCountAggregateOutputType | null
    _avg: SkillAvgAggregateOutputType | null
    _sum: SkillSumAggregateOutputType | null
    _min: SkillMinAggregateOutputType | null
    _max: SkillMaxAggregateOutputType | null
  }

  export type SkillAvgAggregateOutputType = {
    id: number | null
  }

  export type SkillSumAggregateOutputType = {
    id: number | null
  }

  export type SkillMinAggregateOutputType = {
    id: number | null
    name: string | null
    category: string | null
  }

  export type SkillMaxAggregateOutputType = {
    id: number | null
    name: string | null
    category: string | null
  }

  export type SkillCountAggregateOutputType = {
    id: number
    name: number
    category: number
    _all: number
  }


  export type SkillAvgAggregateInputType = {
    id?: true
  }

  export type SkillSumAggregateInputType = {
    id?: true
  }

  export type SkillMinAggregateInputType = {
    id?: true
    name?: true
    category?: true
  }

  export type SkillMaxAggregateInputType = {
    id?: true
    name?: true
    category?: true
  }

  export type SkillCountAggregateInputType = {
    id?: true
    name?: true
    category?: true
    _all?: true
  }

  export type SkillAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Skill to aggregate.
     */
    where?: SkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skills to fetch.
     */
    orderBy?: SkillOrderByWithRelationInput | SkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Skills
    **/
    _count?: true | SkillCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SkillAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SkillSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SkillMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SkillMaxAggregateInputType
  }

  export type GetSkillAggregateType<T extends SkillAggregateArgs> = {
        [P in keyof T & keyof AggregateSkill]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSkill[P]>
      : GetScalarType<T[P], AggregateSkill[P]>
  }




  export type SkillGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SkillWhereInput
    orderBy?: SkillOrderByWithAggregationInput | SkillOrderByWithAggregationInput[]
    by: SkillScalarFieldEnum[] | SkillScalarFieldEnum
    having?: SkillScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SkillCountAggregateInputType | true
    _avg?: SkillAvgAggregateInputType
    _sum?: SkillSumAggregateInputType
    _min?: SkillMinAggregateInputType
    _max?: SkillMaxAggregateInputType
  }

  export type SkillGroupByOutputType = {
    id: number
    name: string
    category: string | null
    _count: SkillCountAggregateOutputType | null
    _avg: SkillAvgAggregateOutputType | null
    _sum: SkillSumAggregateOutputType | null
    _min: SkillMinAggregateOutputType | null
    _max: SkillMaxAggregateOutputType | null
  }

  type GetSkillGroupByPayload<T extends SkillGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SkillGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SkillGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SkillGroupByOutputType[P]>
            : GetScalarType<T[P], SkillGroupByOutputType[P]>
        }
      >
    >


  export type SkillSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    seeker_skills?: boolean | Skill$seeker_skillsArgs<ExtArgs>
    job_required_skills?: boolean | Skill$job_required_skillsArgs<ExtArgs>
    _count?: boolean | SkillCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["skill"]>



  export type SkillSelectScalar = {
    id?: boolean
    name?: boolean
    category?: boolean
  }

  export type SkillOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "category", ExtArgs["result"]["skill"]>
  export type SkillInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seeker_skills?: boolean | Skill$seeker_skillsArgs<ExtArgs>
    job_required_skills?: boolean | Skill$job_required_skillsArgs<ExtArgs>
    _count?: boolean | SkillCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $SkillPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Skill"
    objects: {
      seeker_skills: Prisma.$JobSeekerSkillPayload<ExtArgs>[]
      job_required_skills: Prisma.$JobRequiredSkillPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      category: string | null
    }, ExtArgs["result"]["skill"]>
    composites: {}
  }

  type SkillGetPayload<S extends boolean | null | undefined | SkillDefaultArgs> = $Result.GetResult<Prisma.$SkillPayload, S>

  type SkillCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SkillFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SkillCountAggregateInputType | true
    }

  export interface SkillDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Skill'], meta: { name: 'Skill' } }
    /**
     * Find zero or one Skill that matches the filter.
     * @param {SkillFindUniqueArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SkillFindUniqueArgs>(args: SelectSubset<T, SkillFindUniqueArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Skill that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SkillFindUniqueOrThrowArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SkillFindUniqueOrThrowArgs>(args: SelectSubset<T, SkillFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Skill that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillFindFirstArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SkillFindFirstArgs>(args?: SelectSubset<T, SkillFindFirstArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Skill that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillFindFirstOrThrowArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SkillFindFirstOrThrowArgs>(args?: SelectSubset<T, SkillFindFirstOrThrowArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Skills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Skills
     * const skills = await prisma.skill.findMany()
     * 
     * // Get first 10 Skills
     * const skills = await prisma.skill.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const skillWithIdOnly = await prisma.skill.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SkillFindManyArgs>(args?: SelectSubset<T, SkillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Skill.
     * @param {SkillCreateArgs} args - Arguments to create a Skill.
     * @example
     * // Create one Skill
     * const Skill = await prisma.skill.create({
     *   data: {
     *     // ... data to create a Skill
     *   }
     * })
     * 
     */
    create<T extends SkillCreateArgs>(args: SelectSubset<T, SkillCreateArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Skills.
     * @param {SkillCreateManyArgs} args - Arguments to create many Skills.
     * @example
     * // Create many Skills
     * const skill = await prisma.skill.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SkillCreateManyArgs>(args?: SelectSubset<T, SkillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Skill.
     * @param {SkillDeleteArgs} args - Arguments to delete one Skill.
     * @example
     * // Delete one Skill
     * const Skill = await prisma.skill.delete({
     *   where: {
     *     // ... filter to delete one Skill
     *   }
     * })
     * 
     */
    delete<T extends SkillDeleteArgs>(args: SelectSubset<T, SkillDeleteArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Skill.
     * @param {SkillUpdateArgs} args - Arguments to update one Skill.
     * @example
     * // Update one Skill
     * const skill = await prisma.skill.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SkillUpdateArgs>(args: SelectSubset<T, SkillUpdateArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Skills.
     * @param {SkillDeleteManyArgs} args - Arguments to filter Skills to delete.
     * @example
     * // Delete a few Skills
     * const { count } = await prisma.skill.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SkillDeleteManyArgs>(args?: SelectSubset<T, SkillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Skills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Skills
     * const skill = await prisma.skill.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SkillUpdateManyArgs>(args: SelectSubset<T, SkillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Skill.
     * @param {SkillUpsertArgs} args - Arguments to update or create a Skill.
     * @example
     * // Update or create a Skill
     * const skill = await prisma.skill.upsert({
     *   create: {
     *     // ... data to create a Skill
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Skill we want to update
     *   }
     * })
     */
    upsert<T extends SkillUpsertArgs>(args: SelectSubset<T, SkillUpsertArgs<ExtArgs>>): Prisma__SkillClient<$Result.GetResult<Prisma.$SkillPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Skills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillCountArgs} args - Arguments to filter Skills to count.
     * @example
     * // Count the number of Skills
     * const count = await prisma.skill.count({
     *   where: {
     *     // ... the filter for the Skills we want to count
     *   }
     * })
    **/
    count<T extends SkillCountArgs>(
      args?: Subset<T, SkillCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SkillCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Skill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SkillAggregateArgs>(args: Subset<T, SkillAggregateArgs>): Prisma.PrismaPromise<GetSkillAggregateType<T>>

    /**
     * Group by Skill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SkillGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SkillGroupByArgs['orderBy'] }
        : { orderBy?: SkillGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SkillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSkillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Skill model
   */
  readonly fields: SkillFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Skill.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SkillClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    seeker_skills<T extends Skill$seeker_skillsArgs<ExtArgs> = {}>(args?: Subset<T, Skill$seeker_skillsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobSeekerSkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    job_required_skills<T extends Skill$job_required_skillsArgs<ExtArgs> = {}>(args?: Subset<T, Skill$job_required_skillsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobRequiredSkillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Skill model
   */
  interface SkillFieldRefs {
    readonly id: FieldRef<"Skill", 'Int'>
    readonly name: FieldRef<"Skill", 'String'>
    readonly category: FieldRef<"Skill", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Skill findUnique
   */
  export type SkillFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter, which Skill to fetch.
     */
    where: SkillWhereUniqueInput
  }

  /**
   * Skill findUniqueOrThrow
   */
  export type SkillFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter, which Skill to fetch.
     */
    where: SkillWhereUniqueInput
  }

  /**
   * Skill findFirst
   */
  export type SkillFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter, which Skill to fetch.
     */
    where?: SkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skills to fetch.
     */
    orderBy?: SkillOrderByWithRelationInput | SkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Skills.
     */
    cursor?: SkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Skills.
     */
    distinct?: SkillScalarFieldEnum | SkillScalarFieldEnum[]
  }

  /**
   * Skill findFirstOrThrow
   */
  export type SkillFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter, which Skill to fetch.
     */
    where?: SkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skills to fetch.
     */
    orderBy?: SkillOrderByWithRelationInput | SkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Skills.
     */
    cursor?: SkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Skills.
     */
    distinct?: SkillScalarFieldEnum | SkillScalarFieldEnum[]
  }

  /**
   * Skill findMany
   */
  export type SkillFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter, which Skills to fetch.
     */
    where?: SkillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Skills to fetch.
     */
    orderBy?: SkillOrderByWithRelationInput | SkillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Skills.
     */
    cursor?: SkillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Skills.
     */
    skip?: number
    distinct?: SkillScalarFieldEnum | SkillScalarFieldEnum[]
  }

  /**
   * Skill create
   */
  export type SkillCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * The data needed to create a Skill.
     */
    data: XOR<SkillCreateInput, SkillUncheckedCreateInput>
  }

  /**
   * Skill createMany
   */
  export type SkillCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Skills.
     */
    data: SkillCreateManyInput | SkillCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Skill update
   */
  export type SkillUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * The data needed to update a Skill.
     */
    data: XOR<SkillUpdateInput, SkillUncheckedUpdateInput>
    /**
     * Choose, which Skill to update.
     */
    where: SkillWhereUniqueInput
  }

  /**
   * Skill updateMany
   */
  export type SkillUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Skills.
     */
    data: XOR<SkillUpdateManyMutationInput, SkillUncheckedUpdateManyInput>
    /**
     * Filter which Skills to update
     */
    where?: SkillWhereInput
    /**
     * Limit how many Skills to update.
     */
    limit?: number
  }

  /**
   * Skill upsert
   */
  export type SkillUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * The filter to search for the Skill to update in case it exists.
     */
    where: SkillWhereUniqueInput
    /**
     * In case the Skill found by the `where` argument doesn't exist, create a new Skill with this data.
     */
    create: XOR<SkillCreateInput, SkillUncheckedCreateInput>
    /**
     * In case the Skill was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SkillUpdateInput, SkillUncheckedUpdateInput>
  }

  /**
   * Skill delete
   */
  export type SkillDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
    /**
     * Filter which Skill to delete.
     */
    where: SkillWhereUniqueInput
  }

  /**
   * Skill deleteMany
   */
  export type SkillDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Skills to delete
     */
    where?: SkillWhereInput
    /**
     * Limit how many Skills to delete.
     */
    limit?: number
  }

  /**
   * Skill.seeker_skills
   */
  export type Skill$seeker_skillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobSeekerSkill
     */
    select?: JobSeekerSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobSeekerSkill
     */
    omit?: JobSeekerSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobSeekerSkillInclude<ExtArgs> | null
    where?: JobSeekerSkillWhereInput
    orderBy?: JobSeekerSkillOrderByWithRelationInput | JobSeekerSkillOrderByWithRelationInput[]
    cursor?: JobSeekerSkillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobSeekerSkillScalarFieldEnum | JobSeekerSkillScalarFieldEnum[]
  }

  /**
   * Skill.job_required_skills
   */
  export type Skill$job_required_skillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobRequiredSkill
     */
    select?: JobRequiredSkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JobRequiredSkill
     */
    omit?: JobRequiredSkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobRequiredSkillInclude<ExtArgs> | null
    where?: JobRequiredSkillWhereInput
    orderBy?: JobRequiredSkillOrderByWithRelationInput | JobRequiredSkillOrderByWithRelationInput[]
    cursor?: JobRequiredSkillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobRequiredSkillScalarFieldEnum | JobRequiredSkillScalarFieldEnum[]
  }

  /**
   * Skill without action
   */
  export type SkillDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Skill
     */
    select?: SkillSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Skill
     */
    omit?: SkillOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SkillInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    username: string | null
    email: string | null
    password_hash: string | null
    user_type: string | null
    first_name: string | null
    last_name: string | null
    phone_number: string | null
    created_at: Date | null
    last_login: Date | null
    is_active: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    username: string | null
    email: string | null
    password_hash: string | null
    user_type: string | null
    first_name: string | null
    last_name: string | null
    phone_number: string | null
    created_at: Date | null
    last_login: Date | null
    is_active: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    email: number
    password_hash: number
    user_type: number
    first_name: number
    last_name: number
    phone_number: number
    created_at: number
    last_login: number
    is_active: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password_hash?: true
    user_type?: true
    first_name?: true
    last_name?: true
    phone_number?: true
    created_at?: true
    last_login?: true
    is_active?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password_hash?: true
    user_type?: true
    first_name?: true
    last_name?: true
    phone_number?: true
    created_at?: true
    last_login?: true
    is_active?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password_hash?: true
    user_type?: true
    first_name?: true
    last_name?: true
    phone_number?: true
    created_at?: true
    last_login?: true
    is_active?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    username: string
    email: string
    password_hash: string
    user_type: string
    first_name: string | null
    last_name: string | null
    phone_number: string | null
    created_at: Date
    last_login: Date | null
    is_active: boolean
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password_hash?: boolean
    user_type?: boolean
    first_name?: boolean
    last_name?: boolean
    phone_number?: boolean
    created_at?: boolean
    last_login?: boolean
    is_active?: boolean
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    password_hash?: boolean
    user_type?: boolean
    first_name?: boolean
    last_name?: boolean
    phone_number?: boolean
    created_at?: boolean
    last_login?: boolean
    is_active?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "password_hash" | "user_type" | "first_name" | "last_name" | "phone_number" | "created_at" | "last_login" | "is_active", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      email: string
      password_hash: string
      user_type: string
      first_name: string | null
      last_name: string | null
      phone_number: string | null
      created_at: Date
      last_login: Date | null
      is_active: boolean
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password_hash: FieldRef<"User", 'String'>
    readonly user_type: FieldRef<"User", 'String'>
    readonly first_name: FieldRef<"User", 'String'>
    readonly last_name: FieldRef<"User", 'String'>
    readonly phone_number: FieldRef<"User", 'String'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly last_login: FieldRef<"User", 'DateTime'>
    readonly is_active: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const EmployerScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    company_name: 'company_name',
    company_description: 'company_description',
    industry: 'industry',
    company_size: 'company_size',
    website_url: 'website_url',
    logo_path: 'logo_path',
    founded_year: 'founded_year'
  };

  export type EmployerScalarFieldEnum = (typeof EmployerScalarFieldEnum)[keyof typeof EmployerScalarFieldEnum]


  export const JobApplicationScalarFieldEnum: {
    id: 'id',
    job_id: 'job_id',
    seeker_id: 'seeker_id',
    employer_id: 'employer_id',
    application_date: 'application_date',
    cover_letter: 'cover_letter',
    status: 'status',
    notes: 'notes'
  };

  export type JobApplicationScalarFieldEnum = (typeof JobApplicationScalarFieldEnum)[keyof typeof JobApplicationScalarFieldEnum]


  export const JobListingScalarFieldEnum: {
    id: 'id',
    employer_id: 'employer_id',
    job_title: 'job_title',
    job_description: 'job_description',
    job_requirements: 'job_requirements',
    job_location: 'job_location',
    job_type: 'job_type',
    salary_range_min: 'salary_range_min',
    salary_range_max: 'salary_range_max',
    posted_date: 'posted_date',
    expiration_date: 'expiration_date',
    is_active: 'is_active'
  };

  export type JobListingScalarFieldEnum = (typeof JobListingScalarFieldEnum)[keyof typeof JobListingScalarFieldEnum]


  export const JobRequiredSkillScalarFieldEnum: {
    id: 'id',
    job_id: 'job_id',
    skill_id: 'skill_id',
    is_required: 'is_required',
    importance_level: 'importance_level'
  };

  export type JobRequiredSkillScalarFieldEnum = (typeof JobRequiredSkillScalarFieldEnum)[keyof typeof JobRequiredSkillScalarFieldEnum]


  export const JobSeekerScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    resume_text: 'resume_text',
    resume_file_path: 'resume_file_path',
    education: 'education',
    experience_years: 'experience_years',
    current_job_title: 'current_job_title',
    desired_job_title: 'desired_job_title',
    desired_salary: 'desired_salary',
    location_preference: 'location_preference'
  };

  export type JobSeekerScalarFieldEnum = (typeof JobSeekerScalarFieldEnum)[keyof typeof JobSeekerScalarFieldEnum]


  export const JobSeekerSkillScalarFieldEnum: {
    id: 'id',
    seeker_id: 'seeker_id',
    skill_id: 'skill_id',
    proficiency_level: 'proficiency_level',
    years_of_experience: 'years_of_experience'
  };

  export type JobSeekerSkillScalarFieldEnum = (typeof JobSeekerSkillScalarFieldEnum)[keyof typeof JobSeekerSkillScalarFieldEnum]


  export const SavedJobScalarFieldEnum: {
    id: 'id',
    seeker_id: 'seeker_id',
    job_id: 'job_id',
    saved_date: 'saved_date',
    notes: 'notes'
  };

  export type SavedJobScalarFieldEnum = (typeof SavedJobScalarFieldEnum)[keyof typeof SavedJobScalarFieldEnum]


  export const SkillScalarFieldEnum: {
    id: 'id',
    name: 'name',
    category: 'category'
  };

  export type SkillScalarFieldEnum = (typeof SkillScalarFieldEnum)[keyof typeof SkillScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    password_hash: 'password_hash',
    user_type: 'user_type',
    first_name: 'first_name',
    last_name: 'last_name',
    phone_number: 'phone_number',
    created_at: 'created_at',
    last_login: 'last_login',
    is_active: 'is_active'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const EmployerOrderByRelevanceFieldEnum: {
    company_name: 'company_name',
    company_description: 'company_description',
    industry: 'industry',
    company_size: 'company_size',
    website_url: 'website_url',
    logo_path: 'logo_path'
  };

  export type EmployerOrderByRelevanceFieldEnum = (typeof EmployerOrderByRelevanceFieldEnum)[keyof typeof EmployerOrderByRelevanceFieldEnum]


  export const JobApplicationOrderByRelevanceFieldEnum: {
    cover_letter: 'cover_letter',
    status: 'status',
    notes: 'notes'
  };

  export type JobApplicationOrderByRelevanceFieldEnum = (typeof JobApplicationOrderByRelevanceFieldEnum)[keyof typeof JobApplicationOrderByRelevanceFieldEnum]


  export const JobListingOrderByRelevanceFieldEnum: {
    job_title: 'job_title',
    job_description: 'job_description',
    job_requirements: 'job_requirements',
    job_location: 'job_location',
    job_type: 'job_type'
  };

  export type JobListingOrderByRelevanceFieldEnum = (typeof JobListingOrderByRelevanceFieldEnum)[keyof typeof JobListingOrderByRelevanceFieldEnum]


  export const JobSeekerOrderByRelevanceFieldEnum: {
    resume_text: 'resume_text',
    resume_file_path: 'resume_file_path',
    education: 'education',
    current_job_title: 'current_job_title',
    desired_job_title: 'desired_job_title',
    location_preference: 'location_preference'
  };

  export type JobSeekerOrderByRelevanceFieldEnum = (typeof JobSeekerOrderByRelevanceFieldEnum)[keyof typeof JobSeekerOrderByRelevanceFieldEnum]


  export const SavedJobOrderByRelevanceFieldEnum: {
    notes: 'notes'
  };

  export type SavedJobOrderByRelevanceFieldEnum = (typeof SavedJobOrderByRelevanceFieldEnum)[keyof typeof SavedJobOrderByRelevanceFieldEnum]


  export const SkillOrderByRelevanceFieldEnum: {
    name: 'name',
    category: 'category'
  };

  export type SkillOrderByRelevanceFieldEnum = (typeof SkillOrderByRelevanceFieldEnum)[keyof typeof SkillOrderByRelevanceFieldEnum]


  export const UserOrderByRelevanceFieldEnum: {
    username: 'username',
    email: 'email',
    password_hash: 'password_hash',
    user_type: 'user_type',
    first_name: 'first_name',
    last_name: 'last_name',
    phone_number: 'phone_number'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type EmployerWhereInput = {
    AND?: EmployerWhereInput | EmployerWhereInput[]
    OR?: EmployerWhereInput[]
    NOT?: EmployerWhereInput | EmployerWhereInput[]
    id?: IntFilter<"Employer"> | number
    user_id?: IntFilter<"Employer"> | number
    company_name?: StringFilter<"Employer"> | string
    company_description?: StringNullableFilter<"Employer"> | string | null
    industry?: StringNullableFilter<"Employer"> | string | null
    company_size?: StringNullableFilter<"Employer"> | string | null
    website_url?: StringNullableFilter<"Employer"> | string | null
    logo_path?: StringNullableFilter<"Employer"> | string | null
    founded_year?: IntNullableFilter<"Employer"> | number | null
    job_listings?: JobListingListRelationFilter
    applications?: JobApplicationListRelationFilter
  }

  export type EmployerOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    company_name?: SortOrder
    company_description?: SortOrderInput | SortOrder
    industry?: SortOrderInput | SortOrder
    company_size?: SortOrderInput | SortOrder
    website_url?: SortOrderInput | SortOrder
    logo_path?: SortOrderInput | SortOrder
    founded_year?: SortOrderInput | SortOrder
    job_listings?: JobListingOrderByRelationAggregateInput
    applications?: JobApplicationOrderByRelationAggregateInput
    _relevance?: EmployerOrderByRelevanceInput
  }

  export type EmployerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    user_id?: number
    AND?: EmployerWhereInput | EmployerWhereInput[]
    OR?: EmployerWhereInput[]
    NOT?: EmployerWhereInput | EmployerWhereInput[]
    company_name?: StringFilter<"Employer"> | string
    company_description?: StringNullableFilter<"Employer"> | string | null
    industry?: StringNullableFilter<"Employer"> | string | null
    company_size?: StringNullableFilter<"Employer"> | string | null
    website_url?: StringNullableFilter<"Employer"> | string | null
    logo_path?: StringNullableFilter<"Employer"> | string | null
    founded_year?: IntNullableFilter<"Employer"> | number | null
    job_listings?: JobListingListRelationFilter
    applications?: JobApplicationListRelationFilter
  }, "id" | "user_id">

  export type EmployerOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    company_name?: SortOrder
    company_description?: SortOrderInput | SortOrder
    industry?: SortOrderInput | SortOrder
    company_size?: SortOrderInput | SortOrder
    website_url?: SortOrderInput | SortOrder
    logo_path?: SortOrderInput | SortOrder
    founded_year?: SortOrderInput | SortOrder
    _count?: EmployerCountOrderByAggregateInput
    _avg?: EmployerAvgOrderByAggregateInput
    _max?: EmployerMaxOrderByAggregateInput
    _min?: EmployerMinOrderByAggregateInput
    _sum?: EmployerSumOrderByAggregateInput
  }

  export type EmployerScalarWhereWithAggregatesInput = {
    AND?: EmployerScalarWhereWithAggregatesInput | EmployerScalarWhereWithAggregatesInput[]
    OR?: EmployerScalarWhereWithAggregatesInput[]
    NOT?: EmployerScalarWhereWithAggregatesInput | EmployerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Employer"> | number
    user_id?: IntWithAggregatesFilter<"Employer"> | number
    company_name?: StringWithAggregatesFilter<"Employer"> | string
    company_description?: StringNullableWithAggregatesFilter<"Employer"> | string | null
    industry?: StringNullableWithAggregatesFilter<"Employer"> | string | null
    company_size?: StringNullableWithAggregatesFilter<"Employer"> | string | null
    website_url?: StringNullableWithAggregatesFilter<"Employer"> | string | null
    logo_path?: StringNullableWithAggregatesFilter<"Employer"> | string | null
    founded_year?: IntNullableWithAggregatesFilter<"Employer"> | number | null
  }

  export type JobApplicationWhereInput = {
    AND?: JobApplicationWhereInput | JobApplicationWhereInput[]
    OR?: JobApplicationWhereInput[]
    NOT?: JobApplicationWhereInput | JobApplicationWhereInput[]
    id?: IntFilter<"JobApplication"> | number
    job_id?: IntFilter<"JobApplication"> | number
    seeker_id?: IntFilter<"JobApplication"> | number
    employer_id?: IntFilter<"JobApplication"> | number
    application_date?: DateTimeFilter<"JobApplication"> | Date | string
    cover_letter?: StringNullableFilter<"JobApplication"> | string | null
    status?: StringFilter<"JobApplication"> | string
    notes?: StringNullableFilter<"JobApplication"> | string | null
    job_listing?: XOR<JobListingScalarRelationFilter, JobListingWhereInput>
    seeker?: XOR<JobSeekerScalarRelationFilter, JobSeekerWhereInput>
    employer?: XOR<EmployerScalarRelationFilter, EmployerWhereInput>
  }

  export type JobApplicationOrderByWithRelationInput = {
    id?: SortOrder
    job_id?: SortOrder
    seeker_id?: SortOrder
    employer_id?: SortOrder
    application_date?: SortOrder
    cover_letter?: SortOrderInput | SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    job_listing?: JobListingOrderByWithRelationInput
    seeker?: JobSeekerOrderByWithRelationInput
    employer?: EmployerOrderByWithRelationInput
    _relevance?: JobApplicationOrderByRelevanceInput
  }

  export type JobApplicationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: JobApplicationWhereInput | JobApplicationWhereInput[]
    OR?: JobApplicationWhereInput[]
    NOT?: JobApplicationWhereInput | JobApplicationWhereInput[]
    job_id?: IntFilter<"JobApplication"> | number
    seeker_id?: IntFilter<"JobApplication"> | number
    employer_id?: IntFilter<"JobApplication"> | number
    application_date?: DateTimeFilter<"JobApplication"> | Date | string
    cover_letter?: StringNullableFilter<"JobApplication"> | string | null
    status?: StringFilter<"JobApplication"> | string
    notes?: StringNullableFilter<"JobApplication"> | string | null
    job_listing?: XOR<JobListingScalarRelationFilter, JobListingWhereInput>
    seeker?: XOR<JobSeekerScalarRelationFilter, JobSeekerWhereInput>
    employer?: XOR<EmployerScalarRelationFilter, EmployerWhereInput>
  }, "id">

  export type JobApplicationOrderByWithAggregationInput = {
    id?: SortOrder
    job_id?: SortOrder
    seeker_id?: SortOrder
    employer_id?: SortOrder
    application_date?: SortOrder
    cover_letter?: SortOrderInput | SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    _count?: JobApplicationCountOrderByAggregateInput
    _avg?: JobApplicationAvgOrderByAggregateInput
    _max?: JobApplicationMaxOrderByAggregateInput
    _min?: JobApplicationMinOrderByAggregateInput
    _sum?: JobApplicationSumOrderByAggregateInput
  }

  export type JobApplicationScalarWhereWithAggregatesInput = {
    AND?: JobApplicationScalarWhereWithAggregatesInput | JobApplicationScalarWhereWithAggregatesInput[]
    OR?: JobApplicationScalarWhereWithAggregatesInput[]
    NOT?: JobApplicationScalarWhereWithAggregatesInput | JobApplicationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"JobApplication"> | number
    job_id?: IntWithAggregatesFilter<"JobApplication"> | number
    seeker_id?: IntWithAggregatesFilter<"JobApplication"> | number
    employer_id?: IntWithAggregatesFilter<"JobApplication"> | number
    application_date?: DateTimeWithAggregatesFilter<"JobApplication"> | Date | string
    cover_letter?: StringNullableWithAggregatesFilter<"JobApplication"> | string | null
    status?: StringWithAggregatesFilter<"JobApplication"> | string
    notes?: StringNullableWithAggregatesFilter<"JobApplication"> | string | null
  }

  export type JobListingWhereInput = {
    AND?: JobListingWhereInput | JobListingWhereInput[]
    OR?: JobListingWhereInput[]
    NOT?: JobListingWhereInput | JobListingWhereInput[]
    id?: IntFilter<"JobListing"> | number
    employer_id?: IntFilter<"JobListing"> | number
    job_title?: StringFilter<"JobListing"> | string
    job_description?: StringNullableFilter<"JobListing"> | string | null
    job_requirements?: StringNullableFilter<"JobListing"> | string | null
    job_location?: StringNullableFilter<"JobListing"> | string | null
    job_type?: StringNullableFilter<"JobListing"> | string | null
    salary_range_min?: FloatNullableFilter<"JobListing"> | number | null
    salary_range_max?: FloatNullableFilter<"JobListing"> | number | null
    posted_date?: DateTimeFilter<"JobListing"> | Date | string
    expiration_date?: DateTimeNullableFilter<"JobListing"> | Date | string | null
    is_active?: BoolFilter<"JobListing"> | boolean
    employer?: XOR<EmployerScalarRelationFilter, EmployerWhereInput>
    applications?: JobApplicationListRelationFilter
    required_skills?: JobRequiredSkillListRelationFilter
  }

  export type JobListingOrderByWithRelationInput = {
    id?: SortOrder
    employer_id?: SortOrder
    job_title?: SortOrder
    job_description?: SortOrderInput | SortOrder
    job_requirements?: SortOrderInput | SortOrder
    job_location?: SortOrderInput | SortOrder
    job_type?: SortOrderInput | SortOrder
    salary_range_min?: SortOrderInput | SortOrder
    salary_range_max?: SortOrderInput | SortOrder
    posted_date?: SortOrder
    expiration_date?: SortOrderInput | SortOrder
    is_active?: SortOrder
    employer?: EmployerOrderByWithRelationInput
    applications?: JobApplicationOrderByRelationAggregateInput
    required_skills?: JobRequiredSkillOrderByRelationAggregateInput
    _relevance?: JobListingOrderByRelevanceInput
  }

  export type JobListingWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: JobListingWhereInput | JobListingWhereInput[]
    OR?: JobListingWhereInput[]
    NOT?: JobListingWhereInput | JobListingWhereInput[]
    employer_id?: IntFilter<"JobListing"> | number
    job_title?: StringFilter<"JobListing"> | string
    job_description?: StringNullableFilter<"JobListing"> | string | null
    job_requirements?: StringNullableFilter<"JobListing"> | string | null
    job_location?: StringNullableFilter<"JobListing"> | string | null
    job_type?: StringNullableFilter<"JobListing"> | string | null
    salary_range_min?: FloatNullableFilter<"JobListing"> | number | null
    salary_range_max?: FloatNullableFilter<"JobListing"> | number | null
    posted_date?: DateTimeFilter<"JobListing"> | Date | string
    expiration_date?: DateTimeNullableFilter<"JobListing"> | Date | string | null
    is_active?: BoolFilter<"JobListing"> | boolean
    employer?: XOR<EmployerScalarRelationFilter, EmployerWhereInput>
    applications?: JobApplicationListRelationFilter
    required_skills?: JobRequiredSkillListRelationFilter
  }, "id">

  export type JobListingOrderByWithAggregationInput = {
    id?: SortOrder
    employer_id?: SortOrder
    job_title?: SortOrder
    job_description?: SortOrderInput | SortOrder
    job_requirements?: SortOrderInput | SortOrder
    job_location?: SortOrderInput | SortOrder
    job_type?: SortOrderInput | SortOrder
    salary_range_min?: SortOrderInput | SortOrder
    salary_range_max?: SortOrderInput | SortOrder
    posted_date?: SortOrder
    expiration_date?: SortOrderInput | SortOrder
    is_active?: SortOrder
    _count?: JobListingCountOrderByAggregateInput
    _avg?: JobListingAvgOrderByAggregateInput
    _max?: JobListingMaxOrderByAggregateInput
    _min?: JobListingMinOrderByAggregateInput
    _sum?: JobListingSumOrderByAggregateInput
  }

  export type JobListingScalarWhereWithAggregatesInput = {
    AND?: JobListingScalarWhereWithAggregatesInput | JobListingScalarWhereWithAggregatesInput[]
    OR?: JobListingScalarWhereWithAggregatesInput[]
    NOT?: JobListingScalarWhereWithAggregatesInput | JobListingScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"JobListing"> | number
    employer_id?: IntWithAggregatesFilter<"JobListing"> | number
    job_title?: StringWithAggregatesFilter<"JobListing"> | string
    job_description?: StringNullableWithAggregatesFilter<"JobListing"> | string | null
    job_requirements?: StringNullableWithAggregatesFilter<"JobListing"> | string | null
    job_location?: StringNullableWithAggregatesFilter<"JobListing"> | string | null
    job_type?: StringNullableWithAggregatesFilter<"JobListing"> | string | null
    salary_range_min?: FloatNullableWithAggregatesFilter<"JobListing"> | number | null
    salary_range_max?: FloatNullableWithAggregatesFilter<"JobListing"> | number | null
    posted_date?: DateTimeWithAggregatesFilter<"JobListing"> | Date | string
    expiration_date?: DateTimeNullableWithAggregatesFilter<"JobListing"> | Date | string | null
    is_active?: BoolWithAggregatesFilter<"JobListing"> | boolean
  }

  export type JobRequiredSkillWhereInput = {
    AND?: JobRequiredSkillWhereInput | JobRequiredSkillWhereInput[]
    OR?: JobRequiredSkillWhereInput[]
    NOT?: JobRequiredSkillWhereInput | JobRequiredSkillWhereInput[]
    id?: IntFilter<"JobRequiredSkill"> | number
    job_id?: IntFilter<"JobRequiredSkill"> | number
    skill_id?: IntFilter<"JobRequiredSkill"> | number
    is_required?: BoolFilter<"JobRequiredSkill"> | boolean
    importance_level?: IntFilter<"JobRequiredSkill"> | number
    job_listing?: XOR<JobListingScalarRelationFilter, JobListingWhereInput>
    skill?: XOR<SkillScalarRelationFilter, SkillWhereInput>
  }

  export type JobRequiredSkillOrderByWithRelationInput = {
    id?: SortOrder
    job_id?: SortOrder
    skill_id?: SortOrder
    is_required?: SortOrder
    importance_level?: SortOrder
    job_listing?: JobListingOrderByWithRelationInput
    skill?: SkillOrderByWithRelationInput
  }

  export type JobRequiredSkillWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: JobRequiredSkillWhereInput | JobRequiredSkillWhereInput[]
    OR?: JobRequiredSkillWhereInput[]
    NOT?: JobRequiredSkillWhereInput | JobRequiredSkillWhereInput[]
    job_id?: IntFilter<"JobRequiredSkill"> | number
    skill_id?: IntFilter<"JobRequiredSkill"> | number
    is_required?: BoolFilter<"JobRequiredSkill"> | boolean
    importance_level?: IntFilter<"JobRequiredSkill"> | number
    job_listing?: XOR<JobListingScalarRelationFilter, JobListingWhereInput>
    skill?: XOR<SkillScalarRelationFilter, SkillWhereInput>
  }, "id">

  export type JobRequiredSkillOrderByWithAggregationInput = {
    id?: SortOrder
    job_id?: SortOrder
    skill_id?: SortOrder
    is_required?: SortOrder
    importance_level?: SortOrder
    _count?: JobRequiredSkillCountOrderByAggregateInput
    _avg?: JobRequiredSkillAvgOrderByAggregateInput
    _max?: JobRequiredSkillMaxOrderByAggregateInput
    _min?: JobRequiredSkillMinOrderByAggregateInput
    _sum?: JobRequiredSkillSumOrderByAggregateInput
  }

  export type JobRequiredSkillScalarWhereWithAggregatesInput = {
    AND?: JobRequiredSkillScalarWhereWithAggregatesInput | JobRequiredSkillScalarWhereWithAggregatesInput[]
    OR?: JobRequiredSkillScalarWhereWithAggregatesInput[]
    NOT?: JobRequiredSkillScalarWhereWithAggregatesInput | JobRequiredSkillScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"JobRequiredSkill"> | number
    job_id?: IntWithAggregatesFilter<"JobRequiredSkill"> | number
    skill_id?: IntWithAggregatesFilter<"JobRequiredSkill"> | number
    is_required?: BoolWithAggregatesFilter<"JobRequiredSkill"> | boolean
    importance_level?: IntWithAggregatesFilter<"JobRequiredSkill"> | number
  }

  export type JobSeekerWhereInput = {
    AND?: JobSeekerWhereInput | JobSeekerWhereInput[]
    OR?: JobSeekerWhereInput[]
    NOT?: JobSeekerWhereInput | JobSeekerWhereInput[]
    id?: IntFilter<"JobSeeker"> | number
    user_id?: IntFilter<"JobSeeker"> | number
    resume_text?: StringNullableFilter<"JobSeeker"> | string | null
    resume_file_path?: StringNullableFilter<"JobSeeker"> | string | null
    education?: StringNullableFilter<"JobSeeker"> | string | null
    experience_years?: IntNullableFilter<"JobSeeker"> | number | null
    current_job_title?: StringNullableFilter<"JobSeeker"> | string | null
    desired_job_title?: StringNullableFilter<"JobSeeker"> | string | null
    desired_salary?: FloatNullableFilter<"JobSeeker"> | number | null
    location_preference?: StringNullableFilter<"JobSeeker"> | string | null
    applications?: JobApplicationListRelationFilter
    skills?: JobSeekerSkillListRelationFilter
  }

  export type JobSeekerOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    resume_text?: SortOrderInput | SortOrder
    resume_file_path?: SortOrderInput | SortOrder
    education?: SortOrderInput | SortOrder
    experience_years?: SortOrderInput | SortOrder
    current_job_title?: SortOrderInput | SortOrder
    desired_job_title?: SortOrderInput | SortOrder
    desired_salary?: SortOrderInput | SortOrder
    location_preference?: SortOrderInput | SortOrder
    applications?: JobApplicationOrderByRelationAggregateInput
    skills?: JobSeekerSkillOrderByRelationAggregateInput
    _relevance?: JobSeekerOrderByRelevanceInput
  }

  export type JobSeekerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    user_id?: number
    AND?: JobSeekerWhereInput | JobSeekerWhereInput[]
    OR?: JobSeekerWhereInput[]
    NOT?: JobSeekerWhereInput | JobSeekerWhereInput[]
    resume_text?: StringNullableFilter<"JobSeeker"> | string | null
    resume_file_path?: StringNullableFilter<"JobSeeker"> | string | null
    education?: StringNullableFilter<"JobSeeker"> | string | null
    experience_years?: IntNullableFilter<"JobSeeker"> | number | null
    current_job_title?: StringNullableFilter<"JobSeeker"> | string | null
    desired_job_title?: StringNullableFilter<"JobSeeker"> | string | null
    desired_salary?: FloatNullableFilter<"JobSeeker"> | number | null
    location_preference?: StringNullableFilter<"JobSeeker"> | string | null
    applications?: JobApplicationListRelationFilter
    skills?: JobSeekerSkillListRelationFilter
  }, "id" | "user_id">

  export type JobSeekerOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    resume_text?: SortOrderInput | SortOrder
    resume_file_path?: SortOrderInput | SortOrder
    education?: SortOrderInput | SortOrder
    experience_years?: SortOrderInput | SortOrder
    current_job_title?: SortOrderInput | SortOrder
    desired_job_title?: SortOrderInput | SortOrder
    desired_salary?: SortOrderInput | SortOrder
    location_preference?: SortOrderInput | SortOrder
    _count?: JobSeekerCountOrderByAggregateInput
    _avg?: JobSeekerAvgOrderByAggregateInput
    _max?: JobSeekerMaxOrderByAggregateInput
    _min?: JobSeekerMinOrderByAggregateInput
    _sum?: JobSeekerSumOrderByAggregateInput
  }

  export type JobSeekerScalarWhereWithAggregatesInput = {
    AND?: JobSeekerScalarWhereWithAggregatesInput | JobSeekerScalarWhereWithAggregatesInput[]
    OR?: JobSeekerScalarWhereWithAggregatesInput[]
    NOT?: JobSeekerScalarWhereWithAggregatesInput | JobSeekerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"JobSeeker"> | number
    user_id?: IntWithAggregatesFilter<"JobSeeker"> | number
    resume_text?: StringNullableWithAggregatesFilter<"JobSeeker"> | string | null
    resume_file_path?: StringNullableWithAggregatesFilter<"JobSeeker"> | string | null
    education?: StringNullableWithAggregatesFilter<"JobSeeker"> | string | null
    experience_years?: IntNullableWithAggregatesFilter<"JobSeeker"> | number | null
    current_job_title?: StringNullableWithAggregatesFilter<"JobSeeker"> | string | null
    desired_job_title?: StringNullableWithAggregatesFilter<"JobSeeker"> | string | null
    desired_salary?: FloatNullableWithAggregatesFilter<"JobSeeker"> | number | null
    location_preference?: StringNullableWithAggregatesFilter<"JobSeeker"> | string | null
  }

  export type JobSeekerSkillWhereInput = {
    AND?: JobSeekerSkillWhereInput | JobSeekerSkillWhereInput[]
    OR?: JobSeekerSkillWhereInput[]
    NOT?: JobSeekerSkillWhereInput | JobSeekerSkillWhereInput[]
    id?: IntFilter<"JobSeekerSkill"> | number
    seeker_id?: IntFilter<"JobSeekerSkill"> | number
    skill_id?: IntFilter<"JobSeekerSkill"> | number
    proficiency_level?: IntNullableFilter<"JobSeekerSkill"> | number | null
    years_of_experience?: IntNullableFilter<"JobSeekerSkill"> | number | null
    seeker?: XOR<JobSeekerScalarRelationFilter, JobSeekerWhereInput>
    skill?: XOR<SkillScalarRelationFilter, SkillWhereInput>
  }

  export type JobSeekerSkillOrderByWithRelationInput = {
    id?: SortOrder
    seeker_id?: SortOrder
    skill_id?: SortOrder
    proficiency_level?: SortOrderInput | SortOrder
    years_of_experience?: SortOrderInput | SortOrder
    seeker?: JobSeekerOrderByWithRelationInput
    skill?: SkillOrderByWithRelationInput
  }

  export type JobSeekerSkillWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: JobSeekerSkillWhereInput | JobSeekerSkillWhereInput[]
    OR?: JobSeekerSkillWhereInput[]
    NOT?: JobSeekerSkillWhereInput | JobSeekerSkillWhereInput[]
    seeker_id?: IntFilter<"JobSeekerSkill"> | number
    skill_id?: IntFilter<"JobSeekerSkill"> | number
    proficiency_level?: IntNullableFilter<"JobSeekerSkill"> | number | null
    years_of_experience?: IntNullableFilter<"JobSeekerSkill"> | number | null
    seeker?: XOR<JobSeekerScalarRelationFilter, JobSeekerWhereInput>
    skill?: XOR<SkillScalarRelationFilter, SkillWhereInput>
  }, "id">

  export type JobSeekerSkillOrderByWithAggregationInput = {
    id?: SortOrder
    seeker_id?: SortOrder
    skill_id?: SortOrder
    proficiency_level?: SortOrderInput | SortOrder
    years_of_experience?: SortOrderInput | SortOrder
    _count?: JobSeekerSkillCountOrderByAggregateInput
    _avg?: JobSeekerSkillAvgOrderByAggregateInput
    _max?: JobSeekerSkillMaxOrderByAggregateInput
    _min?: JobSeekerSkillMinOrderByAggregateInput
    _sum?: JobSeekerSkillSumOrderByAggregateInput
  }

  export type JobSeekerSkillScalarWhereWithAggregatesInput = {
    AND?: JobSeekerSkillScalarWhereWithAggregatesInput | JobSeekerSkillScalarWhereWithAggregatesInput[]
    OR?: JobSeekerSkillScalarWhereWithAggregatesInput[]
    NOT?: JobSeekerSkillScalarWhereWithAggregatesInput | JobSeekerSkillScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"JobSeekerSkill"> | number
    seeker_id?: IntWithAggregatesFilter<"JobSeekerSkill"> | number
    skill_id?: IntWithAggregatesFilter<"JobSeekerSkill"> | number
    proficiency_level?: IntNullableWithAggregatesFilter<"JobSeekerSkill"> | number | null
    years_of_experience?: IntNullableWithAggregatesFilter<"JobSeekerSkill"> | number | null
  }

  export type SavedJobWhereInput = {
    AND?: SavedJobWhereInput | SavedJobWhereInput[]
    OR?: SavedJobWhereInput[]
    NOT?: SavedJobWhereInput | SavedJobWhereInput[]
    id?: IntFilter<"SavedJob"> | number
    seeker_id?: IntFilter<"SavedJob"> | number
    job_id?: IntFilter<"SavedJob"> | number
    saved_date?: DateTimeFilter<"SavedJob"> | Date | string
    notes?: StringNullableFilter<"SavedJob"> | string | null
  }

  export type SavedJobOrderByWithRelationInput = {
    id?: SortOrder
    seeker_id?: SortOrder
    job_id?: SortOrder
    saved_date?: SortOrder
    notes?: SortOrderInput | SortOrder
    _relevance?: SavedJobOrderByRelevanceInput
  }

  export type SavedJobWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    seeker_id_job_id?: SavedJobSeeker_idJob_idCompoundUniqueInput
    AND?: SavedJobWhereInput | SavedJobWhereInput[]
    OR?: SavedJobWhereInput[]
    NOT?: SavedJobWhereInput | SavedJobWhereInput[]
    seeker_id?: IntFilter<"SavedJob"> | number
    job_id?: IntFilter<"SavedJob"> | number
    saved_date?: DateTimeFilter<"SavedJob"> | Date | string
    notes?: StringNullableFilter<"SavedJob"> | string | null
  }, "id" | "seeker_id_job_id">

  export type SavedJobOrderByWithAggregationInput = {
    id?: SortOrder
    seeker_id?: SortOrder
    job_id?: SortOrder
    saved_date?: SortOrder
    notes?: SortOrderInput | SortOrder
    _count?: SavedJobCountOrderByAggregateInput
    _avg?: SavedJobAvgOrderByAggregateInput
    _max?: SavedJobMaxOrderByAggregateInput
    _min?: SavedJobMinOrderByAggregateInput
    _sum?: SavedJobSumOrderByAggregateInput
  }

  export type SavedJobScalarWhereWithAggregatesInput = {
    AND?: SavedJobScalarWhereWithAggregatesInput | SavedJobScalarWhereWithAggregatesInput[]
    OR?: SavedJobScalarWhereWithAggregatesInput[]
    NOT?: SavedJobScalarWhereWithAggregatesInput | SavedJobScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SavedJob"> | number
    seeker_id?: IntWithAggregatesFilter<"SavedJob"> | number
    job_id?: IntWithAggregatesFilter<"SavedJob"> | number
    saved_date?: DateTimeWithAggregatesFilter<"SavedJob"> | Date | string
    notes?: StringNullableWithAggregatesFilter<"SavedJob"> | string | null
  }

  export type SkillWhereInput = {
    AND?: SkillWhereInput | SkillWhereInput[]
    OR?: SkillWhereInput[]
    NOT?: SkillWhereInput | SkillWhereInput[]
    id?: IntFilter<"Skill"> | number
    name?: StringFilter<"Skill"> | string
    category?: StringNullableFilter<"Skill"> | string | null
    seeker_skills?: JobSeekerSkillListRelationFilter
    job_required_skills?: JobRequiredSkillListRelationFilter
  }

  export type SkillOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrderInput | SortOrder
    seeker_skills?: JobSeekerSkillOrderByRelationAggregateInput
    job_required_skills?: JobRequiredSkillOrderByRelationAggregateInput
    _relevance?: SkillOrderByRelevanceInput
  }

  export type SkillWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: SkillWhereInput | SkillWhereInput[]
    OR?: SkillWhereInput[]
    NOT?: SkillWhereInput | SkillWhereInput[]
    category?: StringNullableFilter<"Skill"> | string | null
    seeker_skills?: JobSeekerSkillListRelationFilter
    job_required_skills?: JobRequiredSkillListRelationFilter
  }, "id" | "name">

  export type SkillOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrderInput | SortOrder
    _count?: SkillCountOrderByAggregateInput
    _avg?: SkillAvgOrderByAggregateInput
    _max?: SkillMaxOrderByAggregateInput
    _min?: SkillMinOrderByAggregateInput
    _sum?: SkillSumOrderByAggregateInput
  }

  export type SkillScalarWhereWithAggregatesInput = {
    AND?: SkillScalarWhereWithAggregatesInput | SkillScalarWhereWithAggregatesInput[]
    OR?: SkillScalarWhereWithAggregatesInput[]
    NOT?: SkillScalarWhereWithAggregatesInput | SkillScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Skill"> | number
    name?: StringWithAggregatesFilter<"Skill"> | string
    category?: StringNullableWithAggregatesFilter<"Skill"> | string | null
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password_hash?: StringFilter<"User"> | string
    user_type?: StringFilter<"User"> | string
    first_name?: StringNullableFilter<"User"> | string | null
    last_name?: StringNullableFilter<"User"> | string | null
    phone_number?: StringNullableFilter<"User"> | string | null
    created_at?: DateTimeFilter<"User"> | Date | string
    last_login?: DateTimeNullableFilter<"User"> | Date | string | null
    is_active?: BoolFilter<"User"> | boolean
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    user_type?: SortOrder
    first_name?: SortOrderInput | SortOrder
    last_name?: SortOrderInput | SortOrder
    phone_number?: SortOrderInput | SortOrder
    created_at?: SortOrder
    last_login?: SortOrderInput | SortOrder
    is_active?: SortOrder
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password_hash?: StringFilter<"User"> | string
    user_type?: StringFilter<"User"> | string
    first_name?: StringNullableFilter<"User"> | string | null
    last_name?: StringNullableFilter<"User"> | string | null
    phone_number?: StringNullableFilter<"User"> | string | null
    created_at?: DateTimeFilter<"User"> | Date | string
    last_login?: DateTimeNullableFilter<"User"> | Date | string | null
    is_active?: BoolFilter<"User"> | boolean
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    user_type?: SortOrder
    first_name?: SortOrderInput | SortOrder
    last_name?: SortOrderInput | SortOrder
    phone_number?: SortOrderInput | SortOrder
    created_at?: SortOrder
    last_login?: SortOrderInput | SortOrder
    is_active?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password_hash?: StringWithAggregatesFilter<"User"> | string
    user_type?: StringWithAggregatesFilter<"User"> | string
    first_name?: StringNullableWithAggregatesFilter<"User"> | string | null
    last_name?: StringNullableWithAggregatesFilter<"User"> | string | null
    phone_number?: StringNullableWithAggregatesFilter<"User"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    last_login?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    is_active?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type EmployerCreateInput = {
    user_id: number
    company_name: string
    company_description?: string | null
    industry?: string | null
    company_size?: string | null
    website_url?: string | null
    logo_path?: string | null
    founded_year?: number | null
    job_listings?: JobListingCreateNestedManyWithoutEmployerInput
    applications?: JobApplicationCreateNestedManyWithoutEmployerInput
  }

  export type EmployerUncheckedCreateInput = {
    id?: number
    user_id: number
    company_name: string
    company_description?: string | null
    industry?: string | null
    company_size?: string | null
    website_url?: string | null
    logo_path?: string | null
    founded_year?: number | null
    job_listings?: JobListingUncheckedCreateNestedManyWithoutEmployerInput
    applications?: JobApplicationUncheckedCreateNestedManyWithoutEmployerInput
  }

  export type EmployerUpdateInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    company_name?: StringFieldUpdateOperationsInput | string
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    company_size?: NullableStringFieldUpdateOperationsInput | string | null
    website_url?: NullableStringFieldUpdateOperationsInput | string | null
    logo_path?: NullableStringFieldUpdateOperationsInput | string | null
    founded_year?: NullableIntFieldUpdateOperationsInput | number | null
    job_listings?: JobListingUpdateManyWithoutEmployerNestedInput
    applications?: JobApplicationUpdateManyWithoutEmployerNestedInput
  }

  export type EmployerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    company_name?: StringFieldUpdateOperationsInput | string
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    company_size?: NullableStringFieldUpdateOperationsInput | string | null
    website_url?: NullableStringFieldUpdateOperationsInput | string | null
    logo_path?: NullableStringFieldUpdateOperationsInput | string | null
    founded_year?: NullableIntFieldUpdateOperationsInput | number | null
    job_listings?: JobListingUncheckedUpdateManyWithoutEmployerNestedInput
    applications?: JobApplicationUncheckedUpdateManyWithoutEmployerNestedInput
  }

  export type EmployerCreateManyInput = {
    id?: number
    user_id: number
    company_name: string
    company_description?: string | null
    industry?: string | null
    company_size?: string | null
    website_url?: string | null
    logo_path?: string | null
    founded_year?: number | null
  }

  export type EmployerUpdateManyMutationInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    company_name?: StringFieldUpdateOperationsInput | string
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    company_size?: NullableStringFieldUpdateOperationsInput | string | null
    website_url?: NullableStringFieldUpdateOperationsInput | string | null
    logo_path?: NullableStringFieldUpdateOperationsInput | string | null
    founded_year?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type EmployerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    company_name?: StringFieldUpdateOperationsInput | string
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    company_size?: NullableStringFieldUpdateOperationsInput | string | null
    website_url?: NullableStringFieldUpdateOperationsInput | string | null
    logo_path?: NullableStringFieldUpdateOperationsInput | string | null
    founded_year?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type JobApplicationCreateInput = {
    application_date?: Date | string
    cover_letter?: string | null
    status?: string
    notes?: string | null
    job_listing: JobListingCreateNestedOneWithoutApplicationsInput
    seeker: JobSeekerCreateNestedOneWithoutApplicationsInput
    employer: EmployerCreateNestedOneWithoutApplicationsInput
  }

  export type JobApplicationUncheckedCreateInput = {
    id?: number
    job_id: number
    seeker_id: number
    employer_id: number
    application_date?: Date | string
    cover_letter?: string | null
    status?: string
    notes?: string | null
  }

  export type JobApplicationUpdateInput = {
    application_date?: DateTimeFieldUpdateOperationsInput | Date | string
    cover_letter?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    job_listing?: JobListingUpdateOneRequiredWithoutApplicationsNestedInput
    seeker?: JobSeekerUpdateOneRequiredWithoutApplicationsNestedInput
    employer?: EmployerUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type JobApplicationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    job_id?: IntFieldUpdateOperationsInput | number
    seeker_id?: IntFieldUpdateOperationsInput | number
    employer_id?: IntFieldUpdateOperationsInput | number
    application_date?: DateTimeFieldUpdateOperationsInput | Date | string
    cover_letter?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JobApplicationCreateManyInput = {
    id?: number
    job_id: number
    seeker_id: number
    employer_id: number
    application_date?: Date | string
    cover_letter?: string | null
    status?: string
    notes?: string | null
  }

  export type JobApplicationUpdateManyMutationInput = {
    application_date?: DateTimeFieldUpdateOperationsInput | Date | string
    cover_letter?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JobApplicationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    job_id?: IntFieldUpdateOperationsInput | number
    seeker_id?: IntFieldUpdateOperationsInput | number
    employer_id?: IntFieldUpdateOperationsInput | number
    application_date?: DateTimeFieldUpdateOperationsInput | Date | string
    cover_letter?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JobListingCreateInput = {
    job_title: string
    job_description?: string | null
    job_requirements?: string | null
    job_location?: string | null
    job_type?: string | null
    salary_range_min?: number | null
    salary_range_max?: number | null
    posted_date?: Date | string
    expiration_date?: Date | string | null
    is_active?: boolean
    employer: EmployerCreateNestedOneWithoutJob_listingsInput
    applications?: JobApplicationCreateNestedManyWithoutJob_listingInput
    required_skills?: JobRequiredSkillCreateNestedManyWithoutJob_listingInput
  }

  export type JobListingUncheckedCreateInput = {
    id?: number
    employer_id: number
    job_title: string
    job_description?: string | null
    job_requirements?: string | null
    job_location?: string | null
    job_type?: string | null
    salary_range_min?: number | null
    salary_range_max?: number | null
    posted_date?: Date | string
    expiration_date?: Date | string | null
    is_active?: boolean
    applications?: JobApplicationUncheckedCreateNestedManyWithoutJob_listingInput
    required_skills?: JobRequiredSkillUncheckedCreateNestedManyWithoutJob_listingInput
  }

  export type JobListingUpdateInput = {
    job_title?: StringFieldUpdateOperationsInput | string
    job_description?: NullableStringFieldUpdateOperationsInput | string | null
    job_requirements?: NullableStringFieldUpdateOperationsInput | string | null
    job_location?: NullableStringFieldUpdateOperationsInput | string | null
    job_type?: NullableStringFieldUpdateOperationsInput | string | null
    salary_range_min?: NullableFloatFieldUpdateOperationsInput | number | null
    salary_range_max?: NullableFloatFieldUpdateOperationsInput | number | null
    posted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    expiration_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    employer?: EmployerUpdateOneRequiredWithoutJob_listingsNestedInput
    applications?: JobApplicationUpdateManyWithoutJob_listingNestedInput
    required_skills?: JobRequiredSkillUpdateManyWithoutJob_listingNestedInput
  }

  export type JobListingUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    employer_id?: IntFieldUpdateOperationsInput | number
    job_title?: StringFieldUpdateOperationsInput | string
    job_description?: NullableStringFieldUpdateOperationsInput | string | null
    job_requirements?: NullableStringFieldUpdateOperationsInput | string | null
    job_location?: NullableStringFieldUpdateOperationsInput | string | null
    job_type?: NullableStringFieldUpdateOperationsInput | string | null
    salary_range_min?: NullableFloatFieldUpdateOperationsInput | number | null
    salary_range_max?: NullableFloatFieldUpdateOperationsInput | number | null
    posted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    expiration_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    applications?: JobApplicationUncheckedUpdateManyWithoutJob_listingNestedInput
    required_skills?: JobRequiredSkillUncheckedUpdateManyWithoutJob_listingNestedInput
  }

  export type JobListingCreateManyInput = {
    id?: number
    employer_id: number
    job_title: string
    job_description?: string | null
    job_requirements?: string | null
    job_location?: string | null
    job_type?: string | null
    salary_range_min?: number | null
    salary_range_max?: number | null
    posted_date?: Date | string
    expiration_date?: Date | string | null
    is_active?: boolean
  }

  export type JobListingUpdateManyMutationInput = {
    job_title?: StringFieldUpdateOperationsInput | string
    job_description?: NullableStringFieldUpdateOperationsInput | string | null
    job_requirements?: NullableStringFieldUpdateOperationsInput | string | null
    job_location?: NullableStringFieldUpdateOperationsInput | string | null
    job_type?: NullableStringFieldUpdateOperationsInput | string | null
    salary_range_min?: NullableFloatFieldUpdateOperationsInput | number | null
    salary_range_max?: NullableFloatFieldUpdateOperationsInput | number | null
    posted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    expiration_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type JobListingUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    employer_id?: IntFieldUpdateOperationsInput | number
    job_title?: StringFieldUpdateOperationsInput | string
    job_description?: NullableStringFieldUpdateOperationsInput | string | null
    job_requirements?: NullableStringFieldUpdateOperationsInput | string | null
    job_location?: NullableStringFieldUpdateOperationsInput | string | null
    job_type?: NullableStringFieldUpdateOperationsInput | string | null
    salary_range_min?: NullableFloatFieldUpdateOperationsInput | number | null
    salary_range_max?: NullableFloatFieldUpdateOperationsInput | number | null
    posted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    expiration_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type JobRequiredSkillCreateInput = {
    is_required?: boolean
    importance_level?: number
    job_listing: JobListingCreateNestedOneWithoutRequired_skillsInput
    skill: SkillCreateNestedOneWithoutJob_required_skillsInput
  }

  export type JobRequiredSkillUncheckedCreateInput = {
    id?: number
    job_id: number
    skill_id: number
    is_required?: boolean
    importance_level?: number
  }

  export type JobRequiredSkillUpdateInput = {
    is_required?: BoolFieldUpdateOperationsInput | boolean
    importance_level?: IntFieldUpdateOperationsInput | number
    job_listing?: JobListingUpdateOneRequiredWithoutRequired_skillsNestedInput
    skill?: SkillUpdateOneRequiredWithoutJob_required_skillsNestedInput
  }

  export type JobRequiredSkillUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    job_id?: IntFieldUpdateOperationsInput | number
    skill_id?: IntFieldUpdateOperationsInput | number
    is_required?: BoolFieldUpdateOperationsInput | boolean
    importance_level?: IntFieldUpdateOperationsInput | number
  }

  export type JobRequiredSkillCreateManyInput = {
    id?: number
    job_id: number
    skill_id: number
    is_required?: boolean
    importance_level?: number
  }

  export type JobRequiredSkillUpdateManyMutationInput = {
    is_required?: BoolFieldUpdateOperationsInput | boolean
    importance_level?: IntFieldUpdateOperationsInput | number
  }

  export type JobRequiredSkillUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    job_id?: IntFieldUpdateOperationsInput | number
    skill_id?: IntFieldUpdateOperationsInput | number
    is_required?: BoolFieldUpdateOperationsInput | boolean
    importance_level?: IntFieldUpdateOperationsInput | number
  }

  export type JobSeekerCreateInput = {
    user_id: number
    resume_text?: string | null
    resume_file_path?: string | null
    education?: string | null
    experience_years?: number | null
    current_job_title?: string | null
    desired_job_title?: string | null
    desired_salary?: number | null
    location_preference?: string | null
    applications?: JobApplicationCreateNestedManyWithoutSeekerInput
    skills?: JobSeekerSkillCreateNestedManyWithoutSeekerInput
  }

  export type JobSeekerUncheckedCreateInput = {
    id?: number
    user_id: number
    resume_text?: string | null
    resume_file_path?: string | null
    education?: string | null
    experience_years?: number | null
    current_job_title?: string | null
    desired_job_title?: string | null
    desired_salary?: number | null
    location_preference?: string | null
    applications?: JobApplicationUncheckedCreateNestedManyWithoutSeekerInput
    skills?: JobSeekerSkillUncheckedCreateNestedManyWithoutSeekerInput
  }

  export type JobSeekerUpdateInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    resume_text?: NullableStringFieldUpdateOperationsInput | string | null
    resume_file_path?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    experience_years?: NullableIntFieldUpdateOperationsInput | number | null
    current_job_title?: NullableStringFieldUpdateOperationsInput | string | null
    desired_job_title?: NullableStringFieldUpdateOperationsInput | string | null
    desired_salary?: NullableFloatFieldUpdateOperationsInput | number | null
    location_preference?: NullableStringFieldUpdateOperationsInput | string | null
    applications?: JobApplicationUpdateManyWithoutSeekerNestedInput
    skills?: JobSeekerSkillUpdateManyWithoutSeekerNestedInput
  }

  export type JobSeekerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    resume_text?: NullableStringFieldUpdateOperationsInput | string | null
    resume_file_path?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    experience_years?: NullableIntFieldUpdateOperationsInput | number | null
    current_job_title?: NullableStringFieldUpdateOperationsInput | string | null
    desired_job_title?: NullableStringFieldUpdateOperationsInput | string | null
    desired_salary?: NullableFloatFieldUpdateOperationsInput | number | null
    location_preference?: NullableStringFieldUpdateOperationsInput | string | null
    applications?: JobApplicationUncheckedUpdateManyWithoutSeekerNestedInput
    skills?: JobSeekerSkillUncheckedUpdateManyWithoutSeekerNestedInput
  }

  export type JobSeekerCreateManyInput = {
    id?: number
    user_id: number
    resume_text?: string | null
    resume_file_path?: string | null
    education?: string | null
    experience_years?: number | null
    current_job_title?: string | null
    desired_job_title?: string | null
    desired_salary?: number | null
    location_preference?: string | null
  }

  export type JobSeekerUpdateManyMutationInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    resume_text?: NullableStringFieldUpdateOperationsInput | string | null
    resume_file_path?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    experience_years?: NullableIntFieldUpdateOperationsInput | number | null
    current_job_title?: NullableStringFieldUpdateOperationsInput | string | null
    desired_job_title?: NullableStringFieldUpdateOperationsInput | string | null
    desired_salary?: NullableFloatFieldUpdateOperationsInput | number | null
    location_preference?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JobSeekerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    resume_text?: NullableStringFieldUpdateOperationsInput | string | null
    resume_file_path?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    experience_years?: NullableIntFieldUpdateOperationsInput | number | null
    current_job_title?: NullableStringFieldUpdateOperationsInput | string | null
    desired_job_title?: NullableStringFieldUpdateOperationsInput | string | null
    desired_salary?: NullableFloatFieldUpdateOperationsInput | number | null
    location_preference?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JobSeekerSkillCreateInput = {
    proficiency_level?: number | null
    years_of_experience?: number | null
    seeker: JobSeekerCreateNestedOneWithoutSkillsInput
    skill: SkillCreateNestedOneWithoutSeeker_skillsInput
  }

  export type JobSeekerSkillUncheckedCreateInput = {
    id?: number
    seeker_id: number
    skill_id: number
    proficiency_level?: number | null
    years_of_experience?: number | null
  }

  export type JobSeekerSkillUpdateInput = {
    proficiency_level?: NullableIntFieldUpdateOperationsInput | number | null
    years_of_experience?: NullableIntFieldUpdateOperationsInput | number | null
    seeker?: JobSeekerUpdateOneRequiredWithoutSkillsNestedInput
    skill?: SkillUpdateOneRequiredWithoutSeeker_skillsNestedInput
  }

  export type JobSeekerSkillUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    seeker_id?: IntFieldUpdateOperationsInput | number
    skill_id?: IntFieldUpdateOperationsInput | number
    proficiency_level?: NullableIntFieldUpdateOperationsInput | number | null
    years_of_experience?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type JobSeekerSkillCreateManyInput = {
    id?: number
    seeker_id: number
    skill_id: number
    proficiency_level?: number | null
    years_of_experience?: number | null
  }

  export type JobSeekerSkillUpdateManyMutationInput = {
    proficiency_level?: NullableIntFieldUpdateOperationsInput | number | null
    years_of_experience?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type JobSeekerSkillUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    seeker_id?: IntFieldUpdateOperationsInput | number
    skill_id?: IntFieldUpdateOperationsInput | number
    proficiency_level?: NullableIntFieldUpdateOperationsInput | number | null
    years_of_experience?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SavedJobCreateInput = {
    seeker_id: number
    job_id: number
    saved_date?: Date | string
    notes?: string | null
  }

  export type SavedJobUncheckedCreateInput = {
    id?: number
    seeker_id: number
    job_id: number
    saved_date?: Date | string
    notes?: string | null
  }

  export type SavedJobUpdateInput = {
    seeker_id?: IntFieldUpdateOperationsInput | number
    job_id?: IntFieldUpdateOperationsInput | number
    saved_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SavedJobUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    seeker_id?: IntFieldUpdateOperationsInput | number
    job_id?: IntFieldUpdateOperationsInput | number
    saved_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SavedJobCreateManyInput = {
    id?: number
    seeker_id: number
    job_id: number
    saved_date?: Date | string
    notes?: string | null
  }

  export type SavedJobUpdateManyMutationInput = {
    seeker_id?: IntFieldUpdateOperationsInput | number
    job_id?: IntFieldUpdateOperationsInput | number
    saved_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SavedJobUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    seeker_id?: IntFieldUpdateOperationsInput | number
    job_id?: IntFieldUpdateOperationsInput | number
    saved_date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SkillCreateInput = {
    name: string
    category?: string | null
    seeker_skills?: JobSeekerSkillCreateNestedManyWithoutSkillInput
    job_required_skills?: JobRequiredSkillCreateNestedManyWithoutSkillInput
  }

  export type SkillUncheckedCreateInput = {
    id?: number
    name: string
    category?: string | null
    seeker_skills?: JobSeekerSkillUncheckedCreateNestedManyWithoutSkillInput
    job_required_skills?: JobRequiredSkillUncheckedCreateNestedManyWithoutSkillInput
  }

  export type SkillUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    seeker_skills?: JobSeekerSkillUpdateManyWithoutSkillNestedInput
    job_required_skills?: JobRequiredSkillUpdateManyWithoutSkillNestedInput
  }

  export type SkillUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    seeker_skills?: JobSeekerSkillUncheckedUpdateManyWithoutSkillNestedInput
    job_required_skills?: JobRequiredSkillUncheckedUpdateManyWithoutSkillNestedInput
  }

  export type SkillCreateManyInput = {
    id?: number
    name: string
    category?: string | null
  }

  export type SkillUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SkillUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCreateInput = {
    username: string
    email: string
    password_hash: string
    user_type: string
    first_name?: string | null
    last_name?: string | null
    phone_number?: string | null
    created_at?: Date | string
    last_login?: Date | string | null
    is_active?: boolean
  }

  export type UserUncheckedCreateInput = {
    id?: number
    username: string
    email: string
    password_hash: string
    user_type: string
    first_name?: string | null
    last_name?: string | null
    phone_number?: string | null
    created_at?: Date | string
    last_login?: Date | string | null
    is_active?: boolean
  }

  export type UserUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    user_type?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    user_type?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserCreateManyInput = {
    id?: number
    username: string
    email: string
    password_hash: string
    user_type: string
    first_name?: string | null
    last_name?: string | null
    phone_number?: string | null
    created_at?: Date | string
    last_login?: Date | string | null
    is_active?: boolean
  }

  export type UserUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    user_type?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    user_type?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type JobListingListRelationFilter = {
    every?: JobListingWhereInput
    some?: JobListingWhereInput
    none?: JobListingWhereInput
  }

  export type JobApplicationListRelationFilter = {
    every?: JobApplicationWhereInput
    some?: JobApplicationWhereInput
    none?: JobApplicationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type JobListingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JobApplicationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EmployerOrderByRelevanceInput = {
    fields: EmployerOrderByRelevanceFieldEnum | EmployerOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type EmployerCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    company_name?: SortOrder
    company_description?: SortOrder
    industry?: SortOrder
    company_size?: SortOrder
    website_url?: SortOrder
    logo_path?: SortOrder
    founded_year?: SortOrder
  }

  export type EmployerAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    founded_year?: SortOrder
  }

  export type EmployerMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    company_name?: SortOrder
    company_description?: SortOrder
    industry?: SortOrder
    company_size?: SortOrder
    website_url?: SortOrder
    logo_path?: SortOrder
    founded_year?: SortOrder
  }

  export type EmployerMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    company_name?: SortOrder
    company_description?: SortOrder
    industry?: SortOrder
    company_size?: SortOrder
    website_url?: SortOrder
    logo_path?: SortOrder
    founded_year?: SortOrder
  }

  export type EmployerSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    founded_year?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type JobListingScalarRelationFilter = {
    is?: JobListingWhereInput
    isNot?: JobListingWhereInput
  }

  export type JobSeekerScalarRelationFilter = {
    is?: JobSeekerWhereInput
    isNot?: JobSeekerWhereInput
  }

  export type EmployerScalarRelationFilter = {
    is?: EmployerWhereInput
    isNot?: EmployerWhereInput
  }

  export type JobApplicationOrderByRelevanceInput = {
    fields: JobApplicationOrderByRelevanceFieldEnum | JobApplicationOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type JobApplicationCountOrderByAggregateInput = {
    id?: SortOrder
    job_id?: SortOrder
    seeker_id?: SortOrder
    employer_id?: SortOrder
    application_date?: SortOrder
    cover_letter?: SortOrder
    status?: SortOrder
    notes?: SortOrder
  }

  export type JobApplicationAvgOrderByAggregateInput = {
    id?: SortOrder
    job_id?: SortOrder
    seeker_id?: SortOrder
    employer_id?: SortOrder
  }

  export type JobApplicationMaxOrderByAggregateInput = {
    id?: SortOrder
    job_id?: SortOrder
    seeker_id?: SortOrder
    employer_id?: SortOrder
    application_date?: SortOrder
    cover_letter?: SortOrder
    status?: SortOrder
    notes?: SortOrder
  }

  export type JobApplicationMinOrderByAggregateInput = {
    id?: SortOrder
    job_id?: SortOrder
    seeker_id?: SortOrder
    employer_id?: SortOrder
    application_date?: SortOrder
    cover_letter?: SortOrder
    status?: SortOrder
    notes?: SortOrder
  }

  export type JobApplicationSumOrderByAggregateInput = {
    id?: SortOrder
    job_id?: SortOrder
    seeker_id?: SortOrder
    employer_id?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type JobRequiredSkillListRelationFilter = {
    every?: JobRequiredSkillWhereInput
    some?: JobRequiredSkillWhereInput
    none?: JobRequiredSkillWhereInput
  }

  export type JobRequiredSkillOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JobListingOrderByRelevanceInput = {
    fields: JobListingOrderByRelevanceFieldEnum | JobListingOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type JobListingCountOrderByAggregateInput = {
    id?: SortOrder
    employer_id?: SortOrder
    job_title?: SortOrder
    job_description?: SortOrder
    job_requirements?: SortOrder
    job_location?: SortOrder
    job_type?: SortOrder
    salary_range_min?: SortOrder
    salary_range_max?: SortOrder
    posted_date?: SortOrder
    expiration_date?: SortOrder
    is_active?: SortOrder
  }

  export type JobListingAvgOrderByAggregateInput = {
    id?: SortOrder
    employer_id?: SortOrder
    salary_range_min?: SortOrder
    salary_range_max?: SortOrder
  }

  export type JobListingMaxOrderByAggregateInput = {
    id?: SortOrder
    employer_id?: SortOrder
    job_title?: SortOrder
    job_description?: SortOrder
    job_requirements?: SortOrder
    job_location?: SortOrder
    job_type?: SortOrder
    salary_range_min?: SortOrder
    salary_range_max?: SortOrder
    posted_date?: SortOrder
    expiration_date?: SortOrder
    is_active?: SortOrder
  }

  export type JobListingMinOrderByAggregateInput = {
    id?: SortOrder
    employer_id?: SortOrder
    job_title?: SortOrder
    job_description?: SortOrder
    job_requirements?: SortOrder
    job_location?: SortOrder
    job_type?: SortOrder
    salary_range_min?: SortOrder
    salary_range_max?: SortOrder
    posted_date?: SortOrder
    expiration_date?: SortOrder
    is_active?: SortOrder
  }

  export type JobListingSumOrderByAggregateInput = {
    id?: SortOrder
    employer_id?: SortOrder
    salary_range_min?: SortOrder
    salary_range_max?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type SkillScalarRelationFilter = {
    is?: SkillWhereInput
    isNot?: SkillWhereInput
  }

  export type JobRequiredSkillCountOrderByAggregateInput = {
    id?: SortOrder
    job_id?: SortOrder
    skill_id?: SortOrder
    is_required?: SortOrder
    importance_level?: SortOrder
  }

  export type JobRequiredSkillAvgOrderByAggregateInput = {
    id?: SortOrder
    job_id?: SortOrder
    skill_id?: SortOrder
    importance_level?: SortOrder
  }

  export type JobRequiredSkillMaxOrderByAggregateInput = {
    id?: SortOrder
    job_id?: SortOrder
    skill_id?: SortOrder
    is_required?: SortOrder
    importance_level?: SortOrder
  }

  export type JobRequiredSkillMinOrderByAggregateInput = {
    id?: SortOrder
    job_id?: SortOrder
    skill_id?: SortOrder
    is_required?: SortOrder
    importance_level?: SortOrder
  }

  export type JobRequiredSkillSumOrderByAggregateInput = {
    id?: SortOrder
    job_id?: SortOrder
    skill_id?: SortOrder
    importance_level?: SortOrder
  }

  export type JobSeekerSkillListRelationFilter = {
    every?: JobSeekerSkillWhereInput
    some?: JobSeekerSkillWhereInput
    none?: JobSeekerSkillWhereInput
  }

  export type JobSeekerSkillOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JobSeekerOrderByRelevanceInput = {
    fields: JobSeekerOrderByRelevanceFieldEnum | JobSeekerOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type JobSeekerCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    resume_text?: SortOrder
    resume_file_path?: SortOrder
    education?: SortOrder
    experience_years?: SortOrder
    current_job_title?: SortOrder
    desired_job_title?: SortOrder
    desired_salary?: SortOrder
    location_preference?: SortOrder
  }

  export type JobSeekerAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    experience_years?: SortOrder
    desired_salary?: SortOrder
  }

  export type JobSeekerMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    resume_text?: SortOrder
    resume_file_path?: SortOrder
    education?: SortOrder
    experience_years?: SortOrder
    current_job_title?: SortOrder
    desired_job_title?: SortOrder
    desired_salary?: SortOrder
    location_preference?: SortOrder
  }

  export type JobSeekerMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    resume_text?: SortOrder
    resume_file_path?: SortOrder
    education?: SortOrder
    experience_years?: SortOrder
    current_job_title?: SortOrder
    desired_job_title?: SortOrder
    desired_salary?: SortOrder
    location_preference?: SortOrder
  }

  export type JobSeekerSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    experience_years?: SortOrder
    desired_salary?: SortOrder
  }

  export type JobSeekerSkillCountOrderByAggregateInput = {
    id?: SortOrder
    seeker_id?: SortOrder
    skill_id?: SortOrder
    proficiency_level?: SortOrder
    years_of_experience?: SortOrder
  }

  export type JobSeekerSkillAvgOrderByAggregateInput = {
    id?: SortOrder
    seeker_id?: SortOrder
    skill_id?: SortOrder
    proficiency_level?: SortOrder
    years_of_experience?: SortOrder
  }

  export type JobSeekerSkillMaxOrderByAggregateInput = {
    id?: SortOrder
    seeker_id?: SortOrder
    skill_id?: SortOrder
    proficiency_level?: SortOrder
    years_of_experience?: SortOrder
  }

  export type JobSeekerSkillMinOrderByAggregateInput = {
    id?: SortOrder
    seeker_id?: SortOrder
    skill_id?: SortOrder
    proficiency_level?: SortOrder
    years_of_experience?: SortOrder
  }

  export type JobSeekerSkillSumOrderByAggregateInput = {
    id?: SortOrder
    seeker_id?: SortOrder
    skill_id?: SortOrder
    proficiency_level?: SortOrder
    years_of_experience?: SortOrder
  }

  export type SavedJobOrderByRelevanceInput = {
    fields: SavedJobOrderByRelevanceFieldEnum | SavedJobOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SavedJobSeeker_idJob_idCompoundUniqueInput = {
    seeker_id: number
    job_id: number
  }

  export type SavedJobCountOrderByAggregateInput = {
    id?: SortOrder
    seeker_id?: SortOrder
    job_id?: SortOrder
    saved_date?: SortOrder
    notes?: SortOrder
  }

  export type SavedJobAvgOrderByAggregateInput = {
    id?: SortOrder
    seeker_id?: SortOrder
    job_id?: SortOrder
  }

  export type SavedJobMaxOrderByAggregateInput = {
    id?: SortOrder
    seeker_id?: SortOrder
    job_id?: SortOrder
    saved_date?: SortOrder
    notes?: SortOrder
  }

  export type SavedJobMinOrderByAggregateInput = {
    id?: SortOrder
    seeker_id?: SortOrder
    job_id?: SortOrder
    saved_date?: SortOrder
    notes?: SortOrder
  }

  export type SavedJobSumOrderByAggregateInput = {
    id?: SortOrder
    seeker_id?: SortOrder
    job_id?: SortOrder
  }

  export type SkillOrderByRelevanceInput = {
    fields: SkillOrderByRelevanceFieldEnum | SkillOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SkillCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
  }

  export type SkillAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SkillMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
  }

  export type SkillMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
  }

  export type SkillSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    user_type?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    phone_number?: SortOrder
    created_at?: SortOrder
    last_login?: SortOrder
    is_active?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    user_type?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    phone_number?: SortOrder
    created_at?: SortOrder
    last_login?: SortOrder
    is_active?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    user_type?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    phone_number?: SortOrder
    created_at?: SortOrder
    last_login?: SortOrder
    is_active?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type JobListingCreateNestedManyWithoutEmployerInput = {
    create?: XOR<JobListingCreateWithoutEmployerInput, JobListingUncheckedCreateWithoutEmployerInput> | JobListingCreateWithoutEmployerInput[] | JobListingUncheckedCreateWithoutEmployerInput[]
    connectOrCreate?: JobListingCreateOrConnectWithoutEmployerInput | JobListingCreateOrConnectWithoutEmployerInput[]
    createMany?: JobListingCreateManyEmployerInputEnvelope
    connect?: JobListingWhereUniqueInput | JobListingWhereUniqueInput[]
  }

  export type JobApplicationCreateNestedManyWithoutEmployerInput = {
    create?: XOR<JobApplicationCreateWithoutEmployerInput, JobApplicationUncheckedCreateWithoutEmployerInput> | JobApplicationCreateWithoutEmployerInput[] | JobApplicationUncheckedCreateWithoutEmployerInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutEmployerInput | JobApplicationCreateOrConnectWithoutEmployerInput[]
    createMany?: JobApplicationCreateManyEmployerInputEnvelope
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
  }

  export type JobListingUncheckedCreateNestedManyWithoutEmployerInput = {
    create?: XOR<JobListingCreateWithoutEmployerInput, JobListingUncheckedCreateWithoutEmployerInput> | JobListingCreateWithoutEmployerInput[] | JobListingUncheckedCreateWithoutEmployerInput[]
    connectOrCreate?: JobListingCreateOrConnectWithoutEmployerInput | JobListingCreateOrConnectWithoutEmployerInput[]
    createMany?: JobListingCreateManyEmployerInputEnvelope
    connect?: JobListingWhereUniqueInput | JobListingWhereUniqueInput[]
  }

  export type JobApplicationUncheckedCreateNestedManyWithoutEmployerInput = {
    create?: XOR<JobApplicationCreateWithoutEmployerInput, JobApplicationUncheckedCreateWithoutEmployerInput> | JobApplicationCreateWithoutEmployerInput[] | JobApplicationUncheckedCreateWithoutEmployerInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutEmployerInput | JobApplicationCreateOrConnectWithoutEmployerInput[]
    createMany?: JobApplicationCreateManyEmployerInputEnvelope
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type JobListingUpdateManyWithoutEmployerNestedInput = {
    create?: XOR<JobListingCreateWithoutEmployerInput, JobListingUncheckedCreateWithoutEmployerInput> | JobListingCreateWithoutEmployerInput[] | JobListingUncheckedCreateWithoutEmployerInput[]
    connectOrCreate?: JobListingCreateOrConnectWithoutEmployerInput | JobListingCreateOrConnectWithoutEmployerInput[]
    upsert?: JobListingUpsertWithWhereUniqueWithoutEmployerInput | JobListingUpsertWithWhereUniqueWithoutEmployerInput[]
    createMany?: JobListingCreateManyEmployerInputEnvelope
    set?: JobListingWhereUniqueInput | JobListingWhereUniqueInput[]
    disconnect?: JobListingWhereUniqueInput | JobListingWhereUniqueInput[]
    delete?: JobListingWhereUniqueInput | JobListingWhereUniqueInput[]
    connect?: JobListingWhereUniqueInput | JobListingWhereUniqueInput[]
    update?: JobListingUpdateWithWhereUniqueWithoutEmployerInput | JobListingUpdateWithWhereUniqueWithoutEmployerInput[]
    updateMany?: JobListingUpdateManyWithWhereWithoutEmployerInput | JobListingUpdateManyWithWhereWithoutEmployerInput[]
    deleteMany?: JobListingScalarWhereInput | JobListingScalarWhereInput[]
  }

  export type JobApplicationUpdateManyWithoutEmployerNestedInput = {
    create?: XOR<JobApplicationCreateWithoutEmployerInput, JobApplicationUncheckedCreateWithoutEmployerInput> | JobApplicationCreateWithoutEmployerInput[] | JobApplicationUncheckedCreateWithoutEmployerInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutEmployerInput | JobApplicationCreateOrConnectWithoutEmployerInput[]
    upsert?: JobApplicationUpsertWithWhereUniqueWithoutEmployerInput | JobApplicationUpsertWithWhereUniqueWithoutEmployerInput[]
    createMany?: JobApplicationCreateManyEmployerInputEnvelope
    set?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    disconnect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    delete?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    update?: JobApplicationUpdateWithWhereUniqueWithoutEmployerInput | JobApplicationUpdateWithWhereUniqueWithoutEmployerInput[]
    updateMany?: JobApplicationUpdateManyWithWhereWithoutEmployerInput | JobApplicationUpdateManyWithWhereWithoutEmployerInput[]
    deleteMany?: JobApplicationScalarWhereInput | JobApplicationScalarWhereInput[]
  }

  export type JobListingUncheckedUpdateManyWithoutEmployerNestedInput = {
    create?: XOR<JobListingCreateWithoutEmployerInput, JobListingUncheckedCreateWithoutEmployerInput> | JobListingCreateWithoutEmployerInput[] | JobListingUncheckedCreateWithoutEmployerInput[]
    connectOrCreate?: JobListingCreateOrConnectWithoutEmployerInput | JobListingCreateOrConnectWithoutEmployerInput[]
    upsert?: JobListingUpsertWithWhereUniqueWithoutEmployerInput | JobListingUpsertWithWhereUniqueWithoutEmployerInput[]
    createMany?: JobListingCreateManyEmployerInputEnvelope
    set?: JobListingWhereUniqueInput | JobListingWhereUniqueInput[]
    disconnect?: JobListingWhereUniqueInput | JobListingWhereUniqueInput[]
    delete?: JobListingWhereUniqueInput | JobListingWhereUniqueInput[]
    connect?: JobListingWhereUniqueInput | JobListingWhereUniqueInput[]
    update?: JobListingUpdateWithWhereUniqueWithoutEmployerInput | JobListingUpdateWithWhereUniqueWithoutEmployerInput[]
    updateMany?: JobListingUpdateManyWithWhereWithoutEmployerInput | JobListingUpdateManyWithWhereWithoutEmployerInput[]
    deleteMany?: JobListingScalarWhereInput | JobListingScalarWhereInput[]
  }

  export type JobApplicationUncheckedUpdateManyWithoutEmployerNestedInput = {
    create?: XOR<JobApplicationCreateWithoutEmployerInput, JobApplicationUncheckedCreateWithoutEmployerInput> | JobApplicationCreateWithoutEmployerInput[] | JobApplicationUncheckedCreateWithoutEmployerInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutEmployerInput | JobApplicationCreateOrConnectWithoutEmployerInput[]
    upsert?: JobApplicationUpsertWithWhereUniqueWithoutEmployerInput | JobApplicationUpsertWithWhereUniqueWithoutEmployerInput[]
    createMany?: JobApplicationCreateManyEmployerInputEnvelope
    set?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    disconnect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    delete?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    update?: JobApplicationUpdateWithWhereUniqueWithoutEmployerInput | JobApplicationUpdateWithWhereUniqueWithoutEmployerInput[]
    updateMany?: JobApplicationUpdateManyWithWhereWithoutEmployerInput | JobApplicationUpdateManyWithWhereWithoutEmployerInput[]
    deleteMany?: JobApplicationScalarWhereInput | JobApplicationScalarWhereInput[]
  }

  export type JobListingCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<JobListingCreateWithoutApplicationsInput, JobListingUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: JobListingCreateOrConnectWithoutApplicationsInput
    connect?: JobListingWhereUniqueInput
  }

  export type JobSeekerCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<JobSeekerCreateWithoutApplicationsInput, JobSeekerUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: JobSeekerCreateOrConnectWithoutApplicationsInput
    connect?: JobSeekerWhereUniqueInput
  }

  export type EmployerCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<EmployerCreateWithoutApplicationsInput, EmployerUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: EmployerCreateOrConnectWithoutApplicationsInput
    connect?: EmployerWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type JobListingUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<JobListingCreateWithoutApplicationsInput, JobListingUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: JobListingCreateOrConnectWithoutApplicationsInput
    upsert?: JobListingUpsertWithoutApplicationsInput
    connect?: JobListingWhereUniqueInput
    update?: XOR<XOR<JobListingUpdateToOneWithWhereWithoutApplicationsInput, JobListingUpdateWithoutApplicationsInput>, JobListingUncheckedUpdateWithoutApplicationsInput>
  }

  export type JobSeekerUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<JobSeekerCreateWithoutApplicationsInput, JobSeekerUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: JobSeekerCreateOrConnectWithoutApplicationsInput
    upsert?: JobSeekerUpsertWithoutApplicationsInput
    connect?: JobSeekerWhereUniqueInput
    update?: XOR<XOR<JobSeekerUpdateToOneWithWhereWithoutApplicationsInput, JobSeekerUpdateWithoutApplicationsInput>, JobSeekerUncheckedUpdateWithoutApplicationsInput>
  }

  export type EmployerUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<EmployerCreateWithoutApplicationsInput, EmployerUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: EmployerCreateOrConnectWithoutApplicationsInput
    upsert?: EmployerUpsertWithoutApplicationsInput
    connect?: EmployerWhereUniqueInput
    update?: XOR<XOR<EmployerUpdateToOneWithWhereWithoutApplicationsInput, EmployerUpdateWithoutApplicationsInput>, EmployerUncheckedUpdateWithoutApplicationsInput>
  }

  export type EmployerCreateNestedOneWithoutJob_listingsInput = {
    create?: XOR<EmployerCreateWithoutJob_listingsInput, EmployerUncheckedCreateWithoutJob_listingsInput>
    connectOrCreate?: EmployerCreateOrConnectWithoutJob_listingsInput
    connect?: EmployerWhereUniqueInput
  }

  export type JobApplicationCreateNestedManyWithoutJob_listingInput = {
    create?: XOR<JobApplicationCreateWithoutJob_listingInput, JobApplicationUncheckedCreateWithoutJob_listingInput> | JobApplicationCreateWithoutJob_listingInput[] | JobApplicationUncheckedCreateWithoutJob_listingInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutJob_listingInput | JobApplicationCreateOrConnectWithoutJob_listingInput[]
    createMany?: JobApplicationCreateManyJob_listingInputEnvelope
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
  }

  export type JobRequiredSkillCreateNestedManyWithoutJob_listingInput = {
    create?: XOR<JobRequiredSkillCreateWithoutJob_listingInput, JobRequiredSkillUncheckedCreateWithoutJob_listingInput> | JobRequiredSkillCreateWithoutJob_listingInput[] | JobRequiredSkillUncheckedCreateWithoutJob_listingInput[]
    connectOrCreate?: JobRequiredSkillCreateOrConnectWithoutJob_listingInput | JobRequiredSkillCreateOrConnectWithoutJob_listingInput[]
    createMany?: JobRequiredSkillCreateManyJob_listingInputEnvelope
    connect?: JobRequiredSkillWhereUniqueInput | JobRequiredSkillWhereUniqueInput[]
  }

  export type JobApplicationUncheckedCreateNestedManyWithoutJob_listingInput = {
    create?: XOR<JobApplicationCreateWithoutJob_listingInput, JobApplicationUncheckedCreateWithoutJob_listingInput> | JobApplicationCreateWithoutJob_listingInput[] | JobApplicationUncheckedCreateWithoutJob_listingInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutJob_listingInput | JobApplicationCreateOrConnectWithoutJob_listingInput[]
    createMany?: JobApplicationCreateManyJob_listingInputEnvelope
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
  }

  export type JobRequiredSkillUncheckedCreateNestedManyWithoutJob_listingInput = {
    create?: XOR<JobRequiredSkillCreateWithoutJob_listingInput, JobRequiredSkillUncheckedCreateWithoutJob_listingInput> | JobRequiredSkillCreateWithoutJob_listingInput[] | JobRequiredSkillUncheckedCreateWithoutJob_listingInput[]
    connectOrCreate?: JobRequiredSkillCreateOrConnectWithoutJob_listingInput | JobRequiredSkillCreateOrConnectWithoutJob_listingInput[]
    createMany?: JobRequiredSkillCreateManyJob_listingInputEnvelope
    connect?: JobRequiredSkillWhereUniqueInput | JobRequiredSkillWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EmployerUpdateOneRequiredWithoutJob_listingsNestedInput = {
    create?: XOR<EmployerCreateWithoutJob_listingsInput, EmployerUncheckedCreateWithoutJob_listingsInput>
    connectOrCreate?: EmployerCreateOrConnectWithoutJob_listingsInput
    upsert?: EmployerUpsertWithoutJob_listingsInput
    connect?: EmployerWhereUniqueInput
    update?: XOR<XOR<EmployerUpdateToOneWithWhereWithoutJob_listingsInput, EmployerUpdateWithoutJob_listingsInput>, EmployerUncheckedUpdateWithoutJob_listingsInput>
  }

  export type JobApplicationUpdateManyWithoutJob_listingNestedInput = {
    create?: XOR<JobApplicationCreateWithoutJob_listingInput, JobApplicationUncheckedCreateWithoutJob_listingInput> | JobApplicationCreateWithoutJob_listingInput[] | JobApplicationUncheckedCreateWithoutJob_listingInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutJob_listingInput | JobApplicationCreateOrConnectWithoutJob_listingInput[]
    upsert?: JobApplicationUpsertWithWhereUniqueWithoutJob_listingInput | JobApplicationUpsertWithWhereUniqueWithoutJob_listingInput[]
    createMany?: JobApplicationCreateManyJob_listingInputEnvelope
    set?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    disconnect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    delete?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    update?: JobApplicationUpdateWithWhereUniqueWithoutJob_listingInput | JobApplicationUpdateWithWhereUniqueWithoutJob_listingInput[]
    updateMany?: JobApplicationUpdateManyWithWhereWithoutJob_listingInput | JobApplicationUpdateManyWithWhereWithoutJob_listingInput[]
    deleteMany?: JobApplicationScalarWhereInput | JobApplicationScalarWhereInput[]
  }

  export type JobRequiredSkillUpdateManyWithoutJob_listingNestedInput = {
    create?: XOR<JobRequiredSkillCreateWithoutJob_listingInput, JobRequiredSkillUncheckedCreateWithoutJob_listingInput> | JobRequiredSkillCreateWithoutJob_listingInput[] | JobRequiredSkillUncheckedCreateWithoutJob_listingInput[]
    connectOrCreate?: JobRequiredSkillCreateOrConnectWithoutJob_listingInput | JobRequiredSkillCreateOrConnectWithoutJob_listingInput[]
    upsert?: JobRequiredSkillUpsertWithWhereUniqueWithoutJob_listingInput | JobRequiredSkillUpsertWithWhereUniqueWithoutJob_listingInput[]
    createMany?: JobRequiredSkillCreateManyJob_listingInputEnvelope
    set?: JobRequiredSkillWhereUniqueInput | JobRequiredSkillWhereUniqueInput[]
    disconnect?: JobRequiredSkillWhereUniqueInput | JobRequiredSkillWhereUniqueInput[]
    delete?: JobRequiredSkillWhereUniqueInput | JobRequiredSkillWhereUniqueInput[]
    connect?: JobRequiredSkillWhereUniqueInput | JobRequiredSkillWhereUniqueInput[]
    update?: JobRequiredSkillUpdateWithWhereUniqueWithoutJob_listingInput | JobRequiredSkillUpdateWithWhereUniqueWithoutJob_listingInput[]
    updateMany?: JobRequiredSkillUpdateManyWithWhereWithoutJob_listingInput | JobRequiredSkillUpdateManyWithWhereWithoutJob_listingInput[]
    deleteMany?: JobRequiredSkillScalarWhereInput | JobRequiredSkillScalarWhereInput[]
  }

  export type JobApplicationUncheckedUpdateManyWithoutJob_listingNestedInput = {
    create?: XOR<JobApplicationCreateWithoutJob_listingInput, JobApplicationUncheckedCreateWithoutJob_listingInput> | JobApplicationCreateWithoutJob_listingInput[] | JobApplicationUncheckedCreateWithoutJob_listingInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutJob_listingInput | JobApplicationCreateOrConnectWithoutJob_listingInput[]
    upsert?: JobApplicationUpsertWithWhereUniqueWithoutJob_listingInput | JobApplicationUpsertWithWhereUniqueWithoutJob_listingInput[]
    createMany?: JobApplicationCreateManyJob_listingInputEnvelope
    set?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    disconnect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    delete?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    update?: JobApplicationUpdateWithWhereUniqueWithoutJob_listingInput | JobApplicationUpdateWithWhereUniqueWithoutJob_listingInput[]
    updateMany?: JobApplicationUpdateManyWithWhereWithoutJob_listingInput | JobApplicationUpdateManyWithWhereWithoutJob_listingInput[]
    deleteMany?: JobApplicationScalarWhereInput | JobApplicationScalarWhereInput[]
  }

  export type JobRequiredSkillUncheckedUpdateManyWithoutJob_listingNestedInput = {
    create?: XOR<JobRequiredSkillCreateWithoutJob_listingInput, JobRequiredSkillUncheckedCreateWithoutJob_listingInput> | JobRequiredSkillCreateWithoutJob_listingInput[] | JobRequiredSkillUncheckedCreateWithoutJob_listingInput[]
    connectOrCreate?: JobRequiredSkillCreateOrConnectWithoutJob_listingInput | JobRequiredSkillCreateOrConnectWithoutJob_listingInput[]
    upsert?: JobRequiredSkillUpsertWithWhereUniqueWithoutJob_listingInput | JobRequiredSkillUpsertWithWhereUniqueWithoutJob_listingInput[]
    createMany?: JobRequiredSkillCreateManyJob_listingInputEnvelope
    set?: JobRequiredSkillWhereUniqueInput | JobRequiredSkillWhereUniqueInput[]
    disconnect?: JobRequiredSkillWhereUniqueInput | JobRequiredSkillWhereUniqueInput[]
    delete?: JobRequiredSkillWhereUniqueInput | JobRequiredSkillWhereUniqueInput[]
    connect?: JobRequiredSkillWhereUniqueInput | JobRequiredSkillWhereUniqueInput[]
    update?: JobRequiredSkillUpdateWithWhereUniqueWithoutJob_listingInput | JobRequiredSkillUpdateWithWhereUniqueWithoutJob_listingInput[]
    updateMany?: JobRequiredSkillUpdateManyWithWhereWithoutJob_listingInput | JobRequiredSkillUpdateManyWithWhereWithoutJob_listingInput[]
    deleteMany?: JobRequiredSkillScalarWhereInput | JobRequiredSkillScalarWhereInput[]
  }

  export type JobListingCreateNestedOneWithoutRequired_skillsInput = {
    create?: XOR<JobListingCreateWithoutRequired_skillsInput, JobListingUncheckedCreateWithoutRequired_skillsInput>
    connectOrCreate?: JobListingCreateOrConnectWithoutRequired_skillsInput
    connect?: JobListingWhereUniqueInput
  }

  export type SkillCreateNestedOneWithoutJob_required_skillsInput = {
    create?: XOR<SkillCreateWithoutJob_required_skillsInput, SkillUncheckedCreateWithoutJob_required_skillsInput>
    connectOrCreate?: SkillCreateOrConnectWithoutJob_required_skillsInput
    connect?: SkillWhereUniqueInput
  }

  export type JobListingUpdateOneRequiredWithoutRequired_skillsNestedInput = {
    create?: XOR<JobListingCreateWithoutRequired_skillsInput, JobListingUncheckedCreateWithoutRequired_skillsInput>
    connectOrCreate?: JobListingCreateOrConnectWithoutRequired_skillsInput
    upsert?: JobListingUpsertWithoutRequired_skillsInput
    connect?: JobListingWhereUniqueInput
    update?: XOR<XOR<JobListingUpdateToOneWithWhereWithoutRequired_skillsInput, JobListingUpdateWithoutRequired_skillsInput>, JobListingUncheckedUpdateWithoutRequired_skillsInput>
  }

  export type SkillUpdateOneRequiredWithoutJob_required_skillsNestedInput = {
    create?: XOR<SkillCreateWithoutJob_required_skillsInput, SkillUncheckedCreateWithoutJob_required_skillsInput>
    connectOrCreate?: SkillCreateOrConnectWithoutJob_required_skillsInput
    upsert?: SkillUpsertWithoutJob_required_skillsInput
    connect?: SkillWhereUniqueInput
    update?: XOR<XOR<SkillUpdateToOneWithWhereWithoutJob_required_skillsInput, SkillUpdateWithoutJob_required_skillsInput>, SkillUncheckedUpdateWithoutJob_required_skillsInput>
  }

  export type JobApplicationCreateNestedManyWithoutSeekerInput = {
    create?: XOR<JobApplicationCreateWithoutSeekerInput, JobApplicationUncheckedCreateWithoutSeekerInput> | JobApplicationCreateWithoutSeekerInput[] | JobApplicationUncheckedCreateWithoutSeekerInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutSeekerInput | JobApplicationCreateOrConnectWithoutSeekerInput[]
    createMany?: JobApplicationCreateManySeekerInputEnvelope
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
  }

  export type JobSeekerSkillCreateNestedManyWithoutSeekerInput = {
    create?: XOR<JobSeekerSkillCreateWithoutSeekerInput, JobSeekerSkillUncheckedCreateWithoutSeekerInput> | JobSeekerSkillCreateWithoutSeekerInput[] | JobSeekerSkillUncheckedCreateWithoutSeekerInput[]
    connectOrCreate?: JobSeekerSkillCreateOrConnectWithoutSeekerInput | JobSeekerSkillCreateOrConnectWithoutSeekerInput[]
    createMany?: JobSeekerSkillCreateManySeekerInputEnvelope
    connect?: JobSeekerSkillWhereUniqueInput | JobSeekerSkillWhereUniqueInput[]
  }

  export type JobApplicationUncheckedCreateNestedManyWithoutSeekerInput = {
    create?: XOR<JobApplicationCreateWithoutSeekerInput, JobApplicationUncheckedCreateWithoutSeekerInput> | JobApplicationCreateWithoutSeekerInput[] | JobApplicationUncheckedCreateWithoutSeekerInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutSeekerInput | JobApplicationCreateOrConnectWithoutSeekerInput[]
    createMany?: JobApplicationCreateManySeekerInputEnvelope
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
  }

  export type JobSeekerSkillUncheckedCreateNestedManyWithoutSeekerInput = {
    create?: XOR<JobSeekerSkillCreateWithoutSeekerInput, JobSeekerSkillUncheckedCreateWithoutSeekerInput> | JobSeekerSkillCreateWithoutSeekerInput[] | JobSeekerSkillUncheckedCreateWithoutSeekerInput[]
    connectOrCreate?: JobSeekerSkillCreateOrConnectWithoutSeekerInput | JobSeekerSkillCreateOrConnectWithoutSeekerInput[]
    createMany?: JobSeekerSkillCreateManySeekerInputEnvelope
    connect?: JobSeekerSkillWhereUniqueInput | JobSeekerSkillWhereUniqueInput[]
  }

  export type JobApplicationUpdateManyWithoutSeekerNestedInput = {
    create?: XOR<JobApplicationCreateWithoutSeekerInput, JobApplicationUncheckedCreateWithoutSeekerInput> | JobApplicationCreateWithoutSeekerInput[] | JobApplicationUncheckedCreateWithoutSeekerInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutSeekerInput | JobApplicationCreateOrConnectWithoutSeekerInput[]
    upsert?: JobApplicationUpsertWithWhereUniqueWithoutSeekerInput | JobApplicationUpsertWithWhereUniqueWithoutSeekerInput[]
    createMany?: JobApplicationCreateManySeekerInputEnvelope
    set?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    disconnect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    delete?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    update?: JobApplicationUpdateWithWhereUniqueWithoutSeekerInput | JobApplicationUpdateWithWhereUniqueWithoutSeekerInput[]
    updateMany?: JobApplicationUpdateManyWithWhereWithoutSeekerInput | JobApplicationUpdateManyWithWhereWithoutSeekerInput[]
    deleteMany?: JobApplicationScalarWhereInput | JobApplicationScalarWhereInput[]
  }

  export type JobSeekerSkillUpdateManyWithoutSeekerNestedInput = {
    create?: XOR<JobSeekerSkillCreateWithoutSeekerInput, JobSeekerSkillUncheckedCreateWithoutSeekerInput> | JobSeekerSkillCreateWithoutSeekerInput[] | JobSeekerSkillUncheckedCreateWithoutSeekerInput[]
    connectOrCreate?: JobSeekerSkillCreateOrConnectWithoutSeekerInput | JobSeekerSkillCreateOrConnectWithoutSeekerInput[]
    upsert?: JobSeekerSkillUpsertWithWhereUniqueWithoutSeekerInput | JobSeekerSkillUpsertWithWhereUniqueWithoutSeekerInput[]
    createMany?: JobSeekerSkillCreateManySeekerInputEnvelope
    set?: JobSeekerSkillWhereUniqueInput | JobSeekerSkillWhereUniqueInput[]
    disconnect?: JobSeekerSkillWhereUniqueInput | JobSeekerSkillWhereUniqueInput[]
    delete?: JobSeekerSkillWhereUniqueInput | JobSeekerSkillWhereUniqueInput[]
    connect?: JobSeekerSkillWhereUniqueInput | JobSeekerSkillWhereUniqueInput[]
    update?: JobSeekerSkillUpdateWithWhereUniqueWithoutSeekerInput | JobSeekerSkillUpdateWithWhereUniqueWithoutSeekerInput[]
    updateMany?: JobSeekerSkillUpdateManyWithWhereWithoutSeekerInput | JobSeekerSkillUpdateManyWithWhereWithoutSeekerInput[]
    deleteMany?: JobSeekerSkillScalarWhereInput | JobSeekerSkillScalarWhereInput[]
  }

  export type JobApplicationUncheckedUpdateManyWithoutSeekerNestedInput = {
    create?: XOR<JobApplicationCreateWithoutSeekerInput, JobApplicationUncheckedCreateWithoutSeekerInput> | JobApplicationCreateWithoutSeekerInput[] | JobApplicationUncheckedCreateWithoutSeekerInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutSeekerInput | JobApplicationCreateOrConnectWithoutSeekerInput[]
    upsert?: JobApplicationUpsertWithWhereUniqueWithoutSeekerInput | JobApplicationUpsertWithWhereUniqueWithoutSeekerInput[]
    createMany?: JobApplicationCreateManySeekerInputEnvelope
    set?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    disconnect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    delete?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    update?: JobApplicationUpdateWithWhereUniqueWithoutSeekerInput | JobApplicationUpdateWithWhereUniqueWithoutSeekerInput[]
    updateMany?: JobApplicationUpdateManyWithWhereWithoutSeekerInput | JobApplicationUpdateManyWithWhereWithoutSeekerInput[]
    deleteMany?: JobApplicationScalarWhereInput | JobApplicationScalarWhereInput[]
  }

  export type JobSeekerSkillUncheckedUpdateManyWithoutSeekerNestedInput = {
    create?: XOR<JobSeekerSkillCreateWithoutSeekerInput, JobSeekerSkillUncheckedCreateWithoutSeekerInput> | JobSeekerSkillCreateWithoutSeekerInput[] | JobSeekerSkillUncheckedCreateWithoutSeekerInput[]
    connectOrCreate?: JobSeekerSkillCreateOrConnectWithoutSeekerInput | JobSeekerSkillCreateOrConnectWithoutSeekerInput[]
    upsert?: JobSeekerSkillUpsertWithWhereUniqueWithoutSeekerInput | JobSeekerSkillUpsertWithWhereUniqueWithoutSeekerInput[]
    createMany?: JobSeekerSkillCreateManySeekerInputEnvelope
    set?: JobSeekerSkillWhereUniqueInput | JobSeekerSkillWhereUniqueInput[]
    disconnect?: JobSeekerSkillWhereUniqueInput | JobSeekerSkillWhereUniqueInput[]
    delete?: JobSeekerSkillWhereUniqueInput | JobSeekerSkillWhereUniqueInput[]
    connect?: JobSeekerSkillWhereUniqueInput | JobSeekerSkillWhereUniqueInput[]
    update?: JobSeekerSkillUpdateWithWhereUniqueWithoutSeekerInput | JobSeekerSkillUpdateWithWhereUniqueWithoutSeekerInput[]
    updateMany?: JobSeekerSkillUpdateManyWithWhereWithoutSeekerInput | JobSeekerSkillUpdateManyWithWhereWithoutSeekerInput[]
    deleteMany?: JobSeekerSkillScalarWhereInput | JobSeekerSkillScalarWhereInput[]
  }

  export type JobSeekerCreateNestedOneWithoutSkillsInput = {
    create?: XOR<JobSeekerCreateWithoutSkillsInput, JobSeekerUncheckedCreateWithoutSkillsInput>
    connectOrCreate?: JobSeekerCreateOrConnectWithoutSkillsInput
    connect?: JobSeekerWhereUniqueInput
  }

  export type SkillCreateNestedOneWithoutSeeker_skillsInput = {
    create?: XOR<SkillCreateWithoutSeeker_skillsInput, SkillUncheckedCreateWithoutSeeker_skillsInput>
    connectOrCreate?: SkillCreateOrConnectWithoutSeeker_skillsInput
    connect?: SkillWhereUniqueInput
  }

  export type JobSeekerUpdateOneRequiredWithoutSkillsNestedInput = {
    create?: XOR<JobSeekerCreateWithoutSkillsInput, JobSeekerUncheckedCreateWithoutSkillsInput>
    connectOrCreate?: JobSeekerCreateOrConnectWithoutSkillsInput
    upsert?: JobSeekerUpsertWithoutSkillsInput
    connect?: JobSeekerWhereUniqueInput
    update?: XOR<XOR<JobSeekerUpdateToOneWithWhereWithoutSkillsInput, JobSeekerUpdateWithoutSkillsInput>, JobSeekerUncheckedUpdateWithoutSkillsInput>
  }

  export type SkillUpdateOneRequiredWithoutSeeker_skillsNestedInput = {
    create?: XOR<SkillCreateWithoutSeeker_skillsInput, SkillUncheckedCreateWithoutSeeker_skillsInput>
    connectOrCreate?: SkillCreateOrConnectWithoutSeeker_skillsInput
    upsert?: SkillUpsertWithoutSeeker_skillsInput
    connect?: SkillWhereUniqueInput
    update?: XOR<XOR<SkillUpdateToOneWithWhereWithoutSeeker_skillsInput, SkillUpdateWithoutSeeker_skillsInput>, SkillUncheckedUpdateWithoutSeeker_skillsInput>
  }

  export type JobSeekerSkillCreateNestedManyWithoutSkillInput = {
    create?: XOR<JobSeekerSkillCreateWithoutSkillInput, JobSeekerSkillUncheckedCreateWithoutSkillInput> | JobSeekerSkillCreateWithoutSkillInput[] | JobSeekerSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: JobSeekerSkillCreateOrConnectWithoutSkillInput | JobSeekerSkillCreateOrConnectWithoutSkillInput[]
    createMany?: JobSeekerSkillCreateManySkillInputEnvelope
    connect?: JobSeekerSkillWhereUniqueInput | JobSeekerSkillWhereUniqueInput[]
  }

  export type JobRequiredSkillCreateNestedManyWithoutSkillInput = {
    create?: XOR<JobRequiredSkillCreateWithoutSkillInput, JobRequiredSkillUncheckedCreateWithoutSkillInput> | JobRequiredSkillCreateWithoutSkillInput[] | JobRequiredSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: JobRequiredSkillCreateOrConnectWithoutSkillInput | JobRequiredSkillCreateOrConnectWithoutSkillInput[]
    createMany?: JobRequiredSkillCreateManySkillInputEnvelope
    connect?: JobRequiredSkillWhereUniqueInput | JobRequiredSkillWhereUniqueInput[]
  }

  export type JobSeekerSkillUncheckedCreateNestedManyWithoutSkillInput = {
    create?: XOR<JobSeekerSkillCreateWithoutSkillInput, JobSeekerSkillUncheckedCreateWithoutSkillInput> | JobSeekerSkillCreateWithoutSkillInput[] | JobSeekerSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: JobSeekerSkillCreateOrConnectWithoutSkillInput | JobSeekerSkillCreateOrConnectWithoutSkillInput[]
    createMany?: JobSeekerSkillCreateManySkillInputEnvelope
    connect?: JobSeekerSkillWhereUniqueInput | JobSeekerSkillWhereUniqueInput[]
  }

  export type JobRequiredSkillUncheckedCreateNestedManyWithoutSkillInput = {
    create?: XOR<JobRequiredSkillCreateWithoutSkillInput, JobRequiredSkillUncheckedCreateWithoutSkillInput> | JobRequiredSkillCreateWithoutSkillInput[] | JobRequiredSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: JobRequiredSkillCreateOrConnectWithoutSkillInput | JobRequiredSkillCreateOrConnectWithoutSkillInput[]
    createMany?: JobRequiredSkillCreateManySkillInputEnvelope
    connect?: JobRequiredSkillWhereUniqueInput | JobRequiredSkillWhereUniqueInput[]
  }

  export type JobSeekerSkillUpdateManyWithoutSkillNestedInput = {
    create?: XOR<JobSeekerSkillCreateWithoutSkillInput, JobSeekerSkillUncheckedCreateWithoutSkillInput> | JobSeekerSkillCreateWithoutSkillInput[] | JobSeekerSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: JobSeekerSkillCreateOrConnectWithoutSkillInput | JobSeekerSkillCreateOrConnectWithoutSkillInput[]
    upsert?: JobSeekerSkillUpsertWithWhereUniqueWithoutSkillInput | JobSeekerSkillUpsertWithWhereUniqueWithoutSkillInput[]
    createMany?: JobSeekerSkillCreateManySkillInputEnvelope
    set?: JobSeekerSkillWhereUniqueInput | JobSeekerSkillWhereUniqueInput[]
    disconnect?: JobSeekerSkillWhereUniqueInput | JobSeekerSkillWhereUniqueInput[]
    delete?: JobSeekerSkillWhereUniqueInput | JobSeekerSkillWhereUniqueInput[]
    connect?: JobSeekerSkillWhereUniqueInput | JobSeekerSkillWhereUniqueInput[]
    update?: JobSeekerSkillUpdateWithWhereUniqueWithoutSkillInput | JobSeekerSkillUpdateWithWhereUniqueWithoutSkillInput[]
    updateMany?: JobSeekerSkillUpdateManyWithWhereWithoutSkillInput | JobSeekerSkillUpdateManyWithWhereWithoutSkillInput[]
    deleteMany?: JobSeekerSkillScalarWhereInput | JobSeekerSkillScalarWhereInput[]
  }

  export type JobRequiredSkillUpdateManyWithoutSkillNestedInput = {
    create?: XOR<JobRequiredSkillCreateWithoutSkillInput, JobRequiredSkillUncheckedCreateWithoutSkillInput> | JobRequiredSkillCreateWithoutSkillInput[] | JobRequiredSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: JobRequiredSkillCreateOrConnectWithoutSkillInput | JobRequiredSkillCreateOrConnectWithoutSkillInput[]
    upsert?: JobRequiredSkillUpsertWithWhereUniqueWithoutSkillInput | JobRequiredSkillUpsertWithWhereUniqueWithoutSkillInput[]
    createMany?: JobRequiredSkillCreateManySkillInputEnvelope
    set?: JobRequiredSkillWhereUniqueInput | JobRequiredSkillWhereUniqueInput[]
    disconnect?: JobRequiredSkillWhereUniqueInput | JobRequiredSkillWhereUniqueInput[]
    delete?: JobRequiredSkillWhereUniqueInput | JobRequiredSkillWhereUniqueInput[]
    connect?: JobRequiredSkillWhereUniqueInput | JobRequiredSkillWhereUniqueInput[]
    update?: JobRequiredSkillUpdateWithWhereUniqueWithoutSkillInput | JobRequiredSkillUpdateWithWhereUniqueWithoutSkillInput[]
    updateMany?: JobRequiredSkillUpdateManyWithWhereWithoutSkillInput | JobRequiredSkillUpdateManyWithWhereWithoutSkillInput[]
    deleteMany?: JobRequiredSkillScalarWhereInput | JobRequiredSkillScalarWhereInput[]
  }

  export type JobSeekerSkillUncheckedUpdateManyWithoutSkillNestedInput = {
    create?: XOR<JobSeekerSkillCreateWithoutSkillInput, JobSeekerSkillUncheckedCreateWithoutSkillInput> | JobSeekerSkillCreateWithoutSkillInput[] | JobSeekerSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: JobSeekerSkillCreateOrConnectWithoutSkillInput | JobSeekerSkillCreateOrConnectWithoutSkillInput[]
    upsert?: JobSeekerSkillUpsertWithWhereUniqueWithoutSkillInput | JobSeekerSkillUpsertWithWhereUniqueWithoutSkillInput[]
    createMany?: JobSeekerSkillCreateManySkillInputEnvelope
    set?: JobSeekerSkillWhereUniqueInput | JobSeekerSkillWhereUniqueInput[]
    disconnect?: JobSeekerSkillWhereUniqueInput | JobSeekerSkillWhereUniqueInput[]
    delete?: JobSeekerSkillWhereUniqueInput | JobSeekerSkillWhereUniqueInput[]
    connect?: JobSeekerSkillWhereUniqueInput | JobSeekerSkillWhereUniqueInput[]
    update?: JobSeekerSkillUpdateWithWhereUniqueWithoutSkillInput | JobSeekerSkillUpdateWithWhereUniqueWithoutSkillInput[]
    updateMany?: JobSeekerSkillUpdateManyWithWhereWithoutSkillInput | JobSeekerSkillUpdateManyWithWhereWithoutSkillInput[]
    deleteMany?: JobSeekerSkillScalarWhereInput | JobSeekerSkillScalarWhereInput[]
  }

  export type JobRequiredSkillUncheckedUpdateManyWithoutSkillNestedInput = {
    create?: XOR<JobRequiredSkillCreateWithoutSkillInput, JobRequiredSkillUncheckedCreateWithoutSkillInput> | JobRequiredSkillCreateWithoutSkillInput[] | JobRequiredSkillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: JobRequiredSkillCreateOrConnectWithoutSkillInput | JobRequiredSkillCreateOrConnectWithoutSkillInput[]
    upsert?: JobRequiredSkillUpsertWithWhereUniqueWithoutSkillInput | JobRequiredSkillUpsertWithWhereUniqueWithoutSkillInput[]
    createMany?: JobRequiredSkillCreateManySkillInputEnvelope
    set?: JobRequiredSkillWhereUniqueInput | JobRequiredSkillWhereUniqueInput[]
    disconnect?: JobRequiredSkillWhereUniqueInput | JobRequiredSkillWhereUniqueInput[]
    delete?: JobRequiredSkillWhereUniqueInput | JobRequiredSkillWhereUniqueInput[]
    connect?: JobRequiredSkillWhereUniqueInput | JobRequiredSkillWhereUniqueInput[]
    update?: JobRequiredSkillUpdateWithWhereUniqueWithoutSkillInput | JobRequiredSkillUpdateWithWhereUniqueWithoutSkillInput[]
    updateMany?: JobRequiredSkillUpdateManyWithWhereWithoutSkillInput | JobRequiredSkillUpdateManyWithWhereWithoutSkillInput[]
    deleteMany?: JobRequiredSkillScalarWhereInput | JobRequiredSkillScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type JobListingCreateWithoutEmployerInput = {
    job_title: string
    job_description?: string | null
    job_requirements?: string | null
    job_location?: string | null
    job_type?: string | null
    salary_range_min?: number | null
    salary_range_max?: number | null
    posted_date?: Date | string
    expiration_date?: Date | string | null
    is_active?: boolean
    applications?: JobApplicationCreateNestedManyWithoutJob_listingInput
    required_skills?: JobRequiredSkillCreateNestedManyWithoutJob_listingInput
  }

  export type JobListingUncheckedCreateWithoutEmployerInput = {
    id?: number
    job_title: string
    job_description?: string | null
    job_requirements?: string | null
    job_location?: string | null
    job_type?: string | null
    salary_range_min?: number | null
    salary_range_max?: number | null
    posted_date?: Date | string
    expiration_date?: Date | string | null
    is_active?: boolean
    applications?: JobApplicationUncheckedCreateNestedManyWithoutJob_listingInput
    required_skills?: JobRequiredSkillUncheckedCreateNestedManyWithoutJob_listingInput
  }

  export type JobListingCreateOrConnectWithoutEmployerInput = {
    where: JobListingWhereUniqueInput
    create: XOR<JobListingCreateWithoutEmployerInput, JobListingUncheckedCreateWithoutEmployerInput>
  }

  export type JobListingCreateManyEmployerInputEnvelope = {
    data: JobListingCreateManyEmployerInput | JobListingCreateManyEmployerInput[]
    skipDuplicates?: boolean
  }

  export type JobApplicationCreateWithoutEmployerInput = {
    application_date?: Date | string
    cover_letter?: string | null
    status?: string
    notes?: string | null
    job_listing: JobListingCreateNestedOneWithoutApplicationsInput
    seeker: JobSeekerCreateNestedOneWithoutApplicationsInput
  }

  export type JobApplicationUncheckedCreateWithoutEmployerInput = {
    id?: number
    job_id: number
    seeker_id: number
    application_date?: Date | string
    cover_letter?: string | null
    status?: string
    notes?: string | null
  }

  export type JobApplicationCreateOrConnectWithoutEmployerInput = {
    where: JobApplicationWhereUniqueInput
    create: XOR<JobApplicationCreateWithoutEmployerInput, JobApplicationUncheckedCreateWithoutEmployerInput>
  }

  export type JobApplicationCreateManyEmployerInputEnvelope = {
    data: JobApplicationCreateManyEmployerInput | JobApplicationCreateManyEmployerInput[]
    skipDuplicates?: boolean
  }

  export type JobListingUpsertWithWhereUniqueWithoutEmployerInput = {
    where: JobListingWhereUniqueInput
    update: XOR<JobListingUpdateWithoutEmployerInput, JobListingUncheckedUpdateWithoutEmployerInput>
    create: XOR<JobListingCreateWithoutEmployerInput, JobListingUncheckedCreateWithoutEmployerInput>
  }

  export type JobListingUpdateWithWhereUniqueWithoutEmployerInput = {
    where: JobListingWhereUniqueInput
    data: XOR<JobListingUpdateWithoutEmployerInput, JobListingUncheckedUpdateWithoutEmployerInput>
  }

  export type JobListingUpdateManyWithWhereWithoutEmployerInput = {
    where: JobListingScalarWhereInput
    data: XOR<JobListingUpdateManyMutationInput, JobListingUncheckedUpdateManyWithoutEmployerInput>
  }

  export type JobListingScalarWhereInput = {
    AND?: JobListingScalarWhereInput | JobListingScalarWhereInput[]
    OR?: JobListingScalarWhereInput[]
    NOT?: JobListingScalarWhereInput | JobListingScalarWhereInput[]
    id?: IntFilter<"JobListing"> | number
    employer_id?: IntFilter<"JobListing"> | number
    job_title?: StringFilter<"JobListing"> | string
    job_description?: StringNullableFilter<"JobListing"> | string | null
    job_requirements?: StringNullableFilter<"JobListing"> | string | null
    job_location?: StringNullableFilter<"JobListing"> | string | null
    job_type?: StringNullableFilter<"JobListing"> | string | null
    salary_range_min?: FloatNullableFilter<"JobListing"> | number | null
    salary_range_max?: FloatNullableFilter<"JobListing"> | number | null
    posted_date?: DateTimeFilter<"JobListing"> | Date | string
    expiration_date?: DateTimeNullableFilter<"JobListing"> | Date | string | null
    is_active?: BoolFilter<"JobListing"> | boolean
  }

  export type JobApplicationUpsertWithWhereUniqueWithoutEmployerInput = {
    where: JobApplicationWhereUniqueInput
    update: XOR<JobApplicationUpdateWithoutEmployerInput, JobApplicationUncheckedUpdateWithoutEmployerInput>
    create: XOR<JobApplicationCreateWithoutEmployerInput, JobApplicationUncheckedCreateWithoutEmployerInput>
  }

  export type JobApplicationUpdateWithWhereUniqueWithoutEmployerInput = {
    where: JobApplicationWhereUniqueInput
    data: XOR<JobApplicationUpdateWithoutEmployerInput, JobApplicationUncheckedUpdateWithoutEmployerInput>
  }

  export type JobApplicationUpdateManyWithWhereWithoutEmployerInput = {
    where: JobApplicationScalarWhereInput
    data: XOR<JobApplicationUpdateManyMutationInput, JobApplicationUncheckedUpdateManyWithoutEmployerInput>
  }

  export type JobApplicationScalarWhereInput = {
    AND?: JobApplicationScalarWhereInput | JobApplicationScalarWhereInput[]
    OR?: JobApplicationScalarWhereInput[]
    NOT?: JobApplicationScalarWhereInput | JobApplicationScalarWhereInput[]
    id?: IntFilter<"JobApplication"> | number
    job_id?: IntFilter<"JobApplication"> | number
    seeker_id?: IntFilter<"JobApplication"> | number
    employer_id?: IntFilter<"JobApplication"> | number
    application_date?: DateTimeFilter<"JobApplication"> | Date | string
    cover_letter?: StringNullableFilter<"JobApplication"> | string | null
    status?: StringFilter<"JobApplication"> | string
    notes?: StringNullableFilter<"JobApplication"> | string | null
  }

  export type JobListingCreateWithoutApplicationsInput = {
    job_title: string
    job_description?: string | null
    job_requirements?: string | null
    job_location?: string | null
    job_type?: string | null
    salary_range_min?: number | null
    salary_range_max?: number | null
    posted_date?: Date | string
    expiration_date?: Date | string | null
    is_active?: boolean
    employer: EmployerCreateNestedOneWithoutJob_listingsInput
    required_skills?: JobRequiredSkillCreateNestedManyWithoutJob_listingInput
  }

  export type JobListingUncheckedCreateWithoutApplicationsInput = {
    id?: number
    employer_id: number
    job_title: string
    job_description?: string | null
    job_requirements?: string | null
    job_location?: string | null
    job_type?: string | null
    salary_range_min?: number | null
    salary_range_max?: number | null
    posted_date?: Date | string
    expiration_date?: Date | string | null
    is_active?: boolean
    required_skills?: JobRequiredSkillUncheckedCreateNestedManyWithoutJob_listingInput
  }

  export type JobListingCreateOrConnectWithoutApplicationsInput = {
    where: JobListingWhereUniqueInput
    create: XOR<JobListingCreateWithoutApplicationsInput, JobListingUncheckedCreateWithoutApplicationsInput>
  }

  export type JobSeekerCreateWithoutApplicationsInput = {
    user_id: number
    resume_text?: string | null
    resume_file_path?: string | null
    education?: string | null
    experience_years?: number | null
    current_job_title?: string | null
    desired_job_title?: string | null
    desired_salary?: number | null
    location_preference?: string | null
    skills?: JobSeekerSkillCreateNestedManyWithoutSeekerInput
  }

  export type JobSeekerUncheckedCreateWithoutApplicationsInput = {
    id?: number
    user_id: number
    resume_text?: string | null
    resume_file_path?: string | null
    education?: string | null
    experience_years?: number | null
    current_job_title?: string | null
    desired_job_title?: string | null
    desired_salary?: number | null
    location_preference?: string | null
    skills?: JobSeekerSkillUncheckedCreateNestedManyWithoutSeekerInput
  }

  export type JobSeekerCreateOrConnectWithoutApplicationsInput = {
    where: JobSeekerWhereUniqueInput
    create: XOR<JobSeekerCreateWithoutApplicationsInput, JobSeekerUncheckedCreateWithoutApplicationsInput>
  }

  export type EmployerCreateWithoutApplicationsInput = {
    user_id: number
    company_name: string
    company_description?: string | null
    industry?: string | null
    company_size?: string | null
    website_url?: string | null
    logo_path?: string | null
    founded_year?: number | null
    job_listings?: JobListingCreateNestedManyWithoutEmployerInput
  }

  export type EmployerUncheckedCreateWithoutApplicationsInput = {
    id?: number
    user_id: number
    company_name: string
    company_description?: string | null
    industry?: string | null
    company_size?: string | null
    website_url?: string | null
    logo_path?: string | null
    founded_year?: number | null
    job_listings?: JobListingUncheckedCreateNestedManyWithoutEmployerInput
  }

  export type EmployerCreateOrConnectWithoutApplicationsInput = {
    where: EmployerWhereUniqueInput
    create: XOR<EmployerCreateWithoutApplicationsInput, EmployerUncheckedCreateWithoutApplicationsInput>
  }

  export type JobListingUpsertWithoutApplicationsInput = {
    update: XOR<JobListingUpdateWithoutApplicationsInput, JobListingUncheckedUpdateWithoutApplicationsInput>
    create: XOR<JobListingCreateWithoutApplicationsInput, JobListingUncheckedCreateWithoutApplicationsInput>
    where?: JobListingWhereInput
  }

  export type JobListingUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: JobListingWhereInput
    data: XOR<JobListingUpdateWithoutApplicationsInput, JobListingUncheckedUpdateWithoutApplicationsInput>
  }

  export type JobListingUpdateWithoutApplicationsInput = {
    job_title?: StringFieldUpdateOperationsInput | string
    job_description?: NullableStringFieldUpdateOperationsInput | string | null
    job_requirements?: NullableStringFieldUpdateOperationsInput | string | null
    job_location?: NullableStringFieldUpdateOperationsInput | string | null
    job_type?: NullableStringFieldUpdateOperationsInput | string | null
    salary_range_min?: NullableFloatFieldUpdateOperationsInput | number | null
    salary_range_max?: NullableFloatFieldUpdateOperationsInput | number | null
    posted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    expiration_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    employer?: EmployerUpdateOneRequiredWithoutJob_listingsNestedInput
    required_skills?: JobRequiredSkillUpdateManyWithoutJob_listingNestedInput
  }

  export type JobListingUncheckedUpdateWithoutApplicationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    employer_id?: IntFieldUpdateOperationsInput | number
    job_title?: StringFieldUpdateOperationsInput | string
    job_description?: NullableStringFieldUpdateOperationsInput | string | null
    job_requirements?: NullableStringFieldUpdateOperationsInput | string | null
    job_location?: NullableStringFieldUpdateOperationsInput | string | null
    job_type?: NullableStringFieldUpdateOperationsInput | string | null
    salary_range_min?: NullableFloatFieldUpdateOperationsInput | number | null
    salary_range_max?: NullableFloatFieldUpdateOperationsInput | number | null
    posted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    expiration_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    required_skills?: JobRequiredSkillUncheckedUpdateManyWithoutJob_listingNestedInput
  }

  export type JobSeekerUpsertWithoutApplicationsInput = {
    update: XOR<JobSeekerUpdateWithoutApplicationsInput, JobSeekerUncheckedUpdateWithoutApplicationsInput>
    create: XOR<JobSeekerCreateWithoutApplicationsInput, JobSeekerUncheckedCreateWithoutApplicationsInput>
    where?: JobSeekerWhereInput
  }

  export type JobSeekerUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: JobSeekerWhereInput
    data: XOR<JobSeekerUpdateWithoutApplicationsInput, JobSeekerUncheckedUpdateWithoutApplicationsInput>
  }

  export type JobSeekerUpdateWithoutApplicationsInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    resume_text?: NullableStringFieldUpdateOperationsInput | string | null
    resume_file_path?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    experience_years?: NullableIntFieldUpdateOperationsInput | number | null
    current_job_title?: NullableStringFieldUpdateOperationsInput | string | null
    desired_job_title?: NullableStringFieldUpdateOperationsInput | string | null
    desired_salary?: NullableFloatFieldUpdateOperationsInput | number | null
    location_preference?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JobSeekerSkillUpdateManyWithoutSeekerNestedInput
  }

  export type JobSeekerUncheckedUpdateWithoutApplicationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    resume_text?: NullableStringFieldUpdateOperationsInput | string | null
    resume_file_path?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    experience_years?: NullableIntFieldUpdateOperationsInput | number | null
    current_job_title?: NullableStringFieldUpdateOperationsInput | string | null
    desired_job_title?: NullableStringFieldUpdateOperationsInput | string | null
    desired_salary?: NullableFloatFieldUpdateOperationsInput | number | null
    location_preference?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JobSeekerSkillUncheckedUpdateManyWithoutSeekerNestedInput
  }

  export type EmployerUpsertWithoutApplicationsInput = {
    update: XOR<EmployerUpdateWithoutApplicationsInput, EmployerUncheckedUpdateWithoutApplicationsInput>
    create: XOR<EmployerCreateWithoutApplicationsInput, EmployerUncheckedCreateWithoutApplicationsInput>
    where?: EmployerWhereInput
  }

  export type EmployerUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: EmployerWhereInput
    data: XOR<EmployerUpdateWithoutApplicationsInput, EmployerUncheckedUpdateWithoutApplicationsInput>
  }

  export type EmployerUpdateWithoutApplicationsInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    company_name?: StringFieldUpdateOperationsInput | string
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    company_size?: NullableStringFieldUpdateOperationsInput | string | null
    website_url?: NullableStringFieldUpdateOperationsInput | string | null
    logo_path?: NullableStringFieldUpdateOperationsInput | string | null
    founded_year?: NullableIntFieldUpdateOperationsInput | number | null
    job_listings?: JobListingUpdateManyWithoutEmployerNestedInput
  }

  export type EmployerUncheckedUpdateWithoutApplicationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    company_name?: StringFieldUpdateOperationsInput | string
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    company_size?: NullableStringFieldUpdateOperationsInput | string | null
    website_url?: NullableStringFieldUpdateOperationsInput | string | null
    logo_path?: NullableStringFieldUpdateOperationsInput | string | null
    founded_year?: NullableIntFieldUpdateOperationsInput | number | null
    job_listings?: JobListingUncheckedUpdateManyWithoutEmployerNestedInput
  }

  export type EmployerCreateWithoutJob_listingsInput = {
    user_id: number
    company_name: string
    company_description?: string | null
    industry?: string | null
    company_size?: string | null
    website_url?: string | null
    logo_path?: string | null
    founded_year?: number | null
    applications?: JobApplicationCreateNestedManyWithoutEmployerInput
  }

  export type EmployerUncheckedCreateWithoutJob_listingsInput = {
    id?: number
    user_id: number
    company_name: string
    company_description?: string | null
    industry?: string | null
    company_size?: string | null
    website_url?: string | null
    logo_path?: string | null
    founded_year?: number | null
    applications?: JobApplicationUncheckedCreateNestedManyWithoutEmployerInput
  }

  export type EmployerCreateOrConnectWithoutJob_listingsInput = {
    where: EmployerWhereUniqueInput
    create: XOR<EmployerCreateWithoutJob_listingsInput, EmployerUncheckedCreateWithoutJob_listingsInput>
  }

  export type JobApplicationCreateWithoutJob_listingInput = {
    application_date?: Date | string
    cover_letter?: string | null
    status?: string
    notes?: string | null
    seeker: JobSeekerCreateNestedOneWithoutApplicationsInput
    employer: EmployerCreateNestedOneWithoutApplicationsInput
  }

  export type JobApplicationUncheckedCreateWithoutJob_listingInput = {
    id?: number
    seeker_id: number
    employer_id: number
    application_date?: Date | string
    cover_letter?: string | null
    status?: string
    notes?: string | null
  }

  export type JobApplicationCreateOrConnectWithoutJob_listingInput = {
    where: JobApplicationWhereUniqueInput
    create: XOR<JobApplicationCreateWithoutJob_listingInput, JobApplicationUncheckedCreateWithoutJob_listingInput>
  }

  export type JobApplicationCreateManyJob_listingInputEnvelope = {
    data: JobApplicationCreateManyJob_listingInput | JobApplicationCreateManyJob_listingInput[]
    skipDuplicates?: boolean
  }

  export type JobRequiredSkillCreateWithoutJob_listingInput = {
    is_required?: boolean
    importance_level?: number
    skill: SkillCreateNestedOneWithoutJob_required_skillsInput
  }

  export type JobRequiredSkillUncheckedCreateWithoutJob_listingInput = {
    id?: number
    skill_id: number
    is_required?: boolean
    importance_level?: number
  }

  export type JobRequiredSkillCreateOrConnectWithoutJob_listingInput = {
    where: JobRequiredSkillWhereUniqueInput
    create: XOR<JobRequiredSkillCreateWithoutJob_listingInput, JobRequiredSkillUncheckedCreateWithoutJob_listingInput>
  }

  export type JobRequiredSkillCreateManyJob_listingInputEnvelope = {
    data: JobRequiredSkillCreateManyJob_listingInput | JobRequiredSkillCreateManyJob_listingInput[]
    skipDuplicates?: boolean
  }

  export type EmployerUpsertWithoutJob_listingsInput = {
    update: XOR<EmployerUpdateWithoutJob_listingsInput, EmployerUncheckedUpdateWithoutJob_listingsInput>
    create: XOR<EmployerCreateWithoutJob_listingsInput, EmployerUncheckedCreateWithoutJob_listingsInput>
    where?: EmployerWhereInput
  }

  export type EmployerUpdateToOneWithWhereWithoutJob_listingsInput = {
    where?: EmployerWhereInput
    data: XOR<EmployerUpdateWithoutJob_listingsInput, EmployerUncheckedUpdateWithoutJob_listingsInput>
  }

  export type EmployerUpdateWithoutJob_listingsInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    company_name?: StringFieldUpdateOperationsInput | string
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    company_size?: NullableStringFieldUpdateOperationsInput | string | null
    website_url?: NullableStringFieldUpdateOperationsInput | string | null
    logo_path?: NullableStringFieldUpdateOperationsInput | string | null
    founded_year?: NullableIntFieldUpdateOperationsInput | number | null
    applications?: JobApplicationUpdateManyWithoutEmployerNestedInput
  }

  export type EmployerUncheckedUpdateWithoutJob_listingsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    company_name?: StringFieldUpdateOperationsInput | string
    company_description?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    company_size?: NullableStringFieldUpdateOperationsInput | string | null
    website_url?: NullableStringFieldUpdateOperationsInput | string | null
    logo_path?: NullableStringFieldUpdateOperationsInput | string | null
    founded_year?: NullableIntFieldUpdateOperationsInput | number | null
    applications?: JobApplicationUncheckedUpdateManyWithoutEmployerNestedInput
  }

  export type JobApplicationUpsertWithWhereUniqueWithoutJob_listingInput = {
    where: JobApplicationWhereUniqueInput
    update: XOR<JobApplicationUpdateWithoutJob_listingInput, JobApplicationUncheckedUpdateWithoutJob_listingInput>
    create: XOR<JobApplicationCreateWithoutJob_listingInput, JobApplicationUncheckedCreateWithoutJob_listingInput>
  }

  export type JobApplicationUpdateWithWhereUniqueWithoutJob_listingInput = {
    where: JobApplicationWhereUniqueInput
    data: XOR<JobApplicationUpdateWithoutJob_listingInput, JobApplicationUncheckedUpdateWithoutJob_listingInput>
  }

  export type JobApplicationUpdateManyWithWhereWithoutJob_listingInput = {
    where: JobApplicationScalarWhereInput
    data: XOR<JobApplicationUpdateManyMutationInput, JobApplicationUncheckedUpdateManyWithoutJob_listingInput>
  }

  export type JobRequiredSkillUpsertWithWhereUniqueWithoutJob_listingInput = {
    where: JobRequiredSkillWhereUniqueInput
    update: XOR<JobRequiredSkillUpdateWithoutJob_listingInput, JobRequiredSkillUncheckedUpdateWithoutJob_listingInput>
    create: XOR<JobRequiredSkillCreateWithoutJob_listingInput, JobRequiredSkillUncheckedCreateWithoutJob_listingInput>
  }

  export type JobRequiredSkillUpdateWithWhereUniqueWithoutJob_listingInput = {
    where: JobRequiredSkillWhereUniqueInput
    data: XOR<JobRequiredSkillUpdateWithoutJob_listingInput, JobRequiredSkillUncheckedUpdateWithoutJob_listingInput>
  }

  export type JobRequiredSkillUpdateManyWithWhereWithoutJob_listingInput = {
    where: JobRequiredSkillScalarWhereInput
    data: XOR<JobRequiredSkillUpdateManyMutationInput, JobRequiredSkillUncheckedUpdateManyWithoutJob_listingInput>
  }

  export type JobRequiredSkillScalarWhereInput = {
    AND?: JobRequiredSkillScalarWhereInput | JobRequiredSkillScalarWhereInput[]
    OR?: JobRequiredSkillScalarWhereInput[]
    NOT?: JobRequiredSkillScalarWhereInput | JobRequiredSkillScalarWhereInput[]
    id?: IntFilter<"JobRequiredSkill"> | number
    job_id?: IntFilter<"JobRequiredSkill"> | number
    skill_id?: IntFilter<"JobRequiredSkill"> | number
    is_required?: BoolFilter<"JobRequiredSkill"> | boolean
    importance_level?: IntFilter<"JobRequiredSkill"> | number
  }

  export type JobListingCreateWithoutRequired_skillsInput = {
    job_title: string
    job_description?: string | null
    job_requirements?: string | null
    job_location?: string | null
    job_type?: string | null
    salary_range_min?: number | null
    salary_range_max?: number | null
    posted_date?: Date | string
    expiration_date?: Date | string | null
    is_active?: boolean
    employer: EmployerCreateNestedOneWithoutJob_listingsInput
    applications?: JobApplicationCreateNestedManyWithoutJob_listingInput
  }

  export type JobListingUncheckedCreateWithoutRequired_skillsInput = {
    id?: number
    employer_id: number
    job_title: string
    job_description?: string | null
    job_requirements?: string | null
    job_location?: string | null
    job_type?: string | null
    salary_range_min?: number | null
    salary_range_max?: number | null
    posted_date?: Date | string
    expiration_date?: Date | string | null
    is_active?: boolean
    applications?: JobApplicationUncheckedCreateNestedManyWithoutJob_listingInput
  }

  export type JobListingCreateOrConnectWithoutRequired_skillsInput = {
    where: JobListingWhereUniqueInput
    create: XOR<JobListingCreateWithoutRequired_skillsInput, JobListingUncheckedCreateWithoutRequired_skillsInput>
  }

  export type SkillCreateWithoutJob_required_skillsInput = {
    name: string
    category?: string | null
    seeker_skills?: JobSeekerSkillCreateNestedManyWithoutSkillInput
  }

  export type SkillUncheckedCreateWithoutJob_required_skillsInput = {
    id?: number
    name: string
    category?: string | null
    seeker_skills?: JobSeekerSkillUncheckedCreateNestedManyWithoutSkillInput
  }

  export type SkillCreateOrConnectWithoutJob_required_skillsInput = {
    where: SkillWhereUniqueInput
    create: XOR<SkillCreateWithoutJob_required_skillsInput, SkillUncheckedCreateWithoutJob_required_skillsInput>
  }

  export type JobListingUpsertWithoutRequired_skillsInput = {
    update: XOR<JobListingUpdateWithoutRequired_skillsInput, JobListingUncheckedUpdateWithoutRequired_skillsInput>
    create: XOR<JobListingCreateWithoutRequired_skillsInput, JobListingUncheckedCreateWithoutRequired_skillsInput>
    where?: JobListingWhereInput
  }

  export type JobListingUpdateToOneWithWhereWithoutRequired_skillsInput = {
    where?: JobListingWhereInput
    data: XOR<JobListingUpdateWithoutRequired_skillsInput, JobListingUncheckedUpdateWithoutRequired_skillsInput>
  }

  export type JobListingUpdateWithoutRequired_skillsInput = {
    job_title?: StringFieldUpdateOperationsInput | string
    job_description?: NullableStringFieldUpdateOperationsInput | string | null
    job_requirements?: NullableStringFieldUpdateOperationsInput | string | null
    job_location?: NullableStringFieldUpdateOperationsInput | string | null
    job_type?: NullableStringFieldUpdateOperationsInput | string | null
    salary_range_min?: NullableFloatFieldUpdateOperationsInput | number | null
    salary_range_max?: NullableFloatFieldUpdateOperationsInput | number | null
    posted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    expiration_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    employer?: EmployerUpdateOneRequiredWithoutJob_listingsNestedInput
    applications?: JobApplicationUpdateManyWithoutJob_listingNestedInput
  }

  export type JobListingUncheckedUpdateWithoutRequired_skillsInput = {
    id?: IntFieldUpdateOperationsInput | number
    employer_id?: IntFieldUpdateOperationsInput | number
    job_title?: StringFieldUpdateOperationsInput | string
    job_description?: NullableStringFieldUpdateOperationsInput | string | null
    job_requirements?: NullableStringFieldUpdateOperationsInput | string | null
    job_location?: NullableStringFieldUpdateOperationsInput | string | null
    job_type?: NullableStringFieldUpdateOperationsInput | string | null
    salary_range_min?: NullableFloatFieldUpdateOperationsInput | number | null
    salary_range_max?: NullableFloatFieldUpdateOperationsInput | number | null
    posted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    expiration_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    applications?: JobApplicationUncheckedUpdateManyWithoutJob_listingNestedInput
  }

  export type SkillUpsertWithoutJob_required_skillsInput = {
    update: XOR<SkillUpdateWithoutJob_required_skillsInput, SkillUncheckedUpdateWithoutJob_required_skillsInput>
    create: XOR<SkillCreateWithoutJob_required_skillsInput, SkillUncheckedCreateWithoutJob_required_skillsInput>
    where?: SkillWhereInput
  }

  export type SkillUpdateToOneWithWhereWithoutJob_required_skillsInput = {
    where?: SkillWhereInput
    data: XOR<SkillUpdateWithoutJob_required_skillsInput, SkillUncheckedUpdateWithoutJob_required_skillsInput>
  }

  export type SkillUpdateWithoutJob_required_skillsInput = {
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    seeker_skills?: JobSeekerSkillUpdateManyWithoutSkillNestedInput
  }

  export type SkillUncheckedUpdateWithoutJob_required_skillsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    seeker_skills?: JobSeekerSkillUncheckedUpdateManyWithoutSkillNestedInput
  }

  export type JobApplicationCreateWithoutSeekerInput = {
    application_date?: Date | string
    cover_letter?: string | null
    status?: string
    notes?: string | null
    job_listing: JobListingCreateNestedOneWithoutApplicationsInput
    employer: EmployerCreateNestedOneWithoutApplicationsInput
  }

  export type JobApplicationUncheckedCreateWithoutSeekerInput = {
    id?: number
    job_id: number
    employer_id: number
    application_date?: Date | string
    cover_letter?: string | null
    status?: string
    notes?: string | null
  }

  export type JobApplicationCreateOrConnectWithoutSeekerInput = {
    where: JobApplicationWhereUniqueInput
    create: XOR<JobApplicationCreateWithoutSeekerInput, JobApplicationUncheckedCreateWithoutSeekerInput>
  }

  export type JobApplicationCreateManySeekerInputEnvelope = {
    data: JobApplicationCreateManySeekerInput | JobApplicationCreateManySeekerInput[]
    skipDuplicates?: boolean
  }

  export type JobSeekerSkillCreateWithoutSeekerInput = {
    proficiency_level?: number | null
    years_of_experience?: number | null
    skill: SkillCreateNestedOneWithoutSeeker_skillsInput
  }

  export type JobSeekerSkillUncheckedCreateWithoutSeekerInput = {
    id?: number
    skill_id: number
    proficiency_level?: number | null
    years_of_experience?: number | null
  }

  export type JobSeekerSkillCreateOrConnectWithoutSeekerInput = {
    where: JobSeekerSkillWhereUniqueInput
    create: XOR<JobSeekerSkillCreateWithoutSeekerInput, JobSeekerSkillUncheckedCreateWithoutSeekerInput>
  }

  export type JobSeekerSkillCreateManySeekerInputEnvelope = {
    data: JobSeekerSkillCreateManySeekerInput | JobSeekerSkillCreateManySeekerInput[]
    skipDuplicates?: boolean
  }

  export type JobApplicationUpsertWithWhereUniqueWithoutSeekerInput = {
    where: JobApplicationWhereUniqueInput
    update: XOR<JobApplicationUpdateWithoutSeekerInput, JobApplicationUncheckedUpdateWithoutSeekerInput>
    create: XOR<JobApplicationCreateWithoutSeekerInput, JobApplicationUncheckedCreateWithoutSeekerInput>
  }

  export type JobApplicationUpdateWithWhereUniqueWithoutSeekerInput = {
    where: JobApplicationWhereUniqueInput
    data: XOR<JobApplicationUpdateWithoutSeekerInput, JobApplicationUncheckedUpdateWithoutSeekerInput>
  }

  export type JobApplicationUpdateManyWithWhereWithoutSeekerInput = {
    where: JobApplicationScalarWhereInput
    data: XOR<JobApplicationUpdateManyMutationInput, JobApplicationUncheckedUpdateManyWithoutSeekerInput>
  }

  export type JobSeekerSkillUpsertWithWhereUniqueWithoutSeekerInput = {
    where: JobSeekerSkillWhereUniqueInput
    update: XOR<JobSeekerSkillUpdateWithoutSeekerInput, JobSeekerSkillUncheckedUpdateWithoutSeekerInput>
    create: XOR<JobSeekerSkillCreateWithoutSeekerInput, JobSeekerSkillUncheckedCreateWithoutSeekerInput>
  }

  export type JobSeekerSkillUpdateWithWhereUniqueWithoutSeekerInput = {
    where: JobSeekerSkillWhereUniqueInput
    data: XOR<JobSeekerSkillUpdateWithoutSeekerInput, JobSeekerSkillUncheckedUpdateWithoutSeekerInput>
  }

  export type JobSeekerSkillUpdateManyWithWhereWithoutSeekerInput = {
    where: JobSeekerSkillScalarWhereInput
    data: XOR<JobSeekerSkillUpdateManyMutationInput, JobSeekerSkillUncheckedUpdateManyWithoutSeekerInput>
  }

  export type JobSeekerSkillScalarWhereInput = {
    AND?: JobSeekerSkillScalarWhereInput | JobSeekerSkillScalarWhereInput[]
    OR?: JobSeekerSkillScalarWhereInput[]
    NOT?: JobSeekerSkillScalarWhereInput | JobSeekerSkillScalarWhereInput[]
    id?: IntFilter<"JobSeekerSkill"> | number
    seeker_id?: IntFilter<"JobSeekerSkill"> | number
    skill_id?: IntFilter<"JobSeekerSkill"> | number
    proficiency_level?: IntNullableFilter<"JobSeekerSkill"> | number | null
    years_of_experience?: IntNullableFilter<"JobSeekerSkill"> | number | null
  }

  export type JobSeekerCreateWithoutSkillsInput = {
    user_id: number
    resume_text?: string | null
    resume_file_path?: string | null
    education?: string | null
    experience_years?: number | null
    current_job_title?: string | null
    desired_job_title?: string | null
    desired_salary?: number | null
    location_preference?: string | null
    applications?: JobApplicationCreateNestedManyWithoutSeekerInput
  }

  export type JobSeekerUncheckedCreateWithoutSkillsInput = {
    id?: number
    user_id: number
    resume_text?: string | null
    resume_file_path?: string | null
    education?: string | null
    experience_years?: number | null
    current_job_title?: string | null
    desired_job_title?: string | null
    desired_salary?: number | null
    location_preference?: string | null
    applications?: JobApplicationUncheckedCreateNestedManyWithoutSeekerInput
  }

  export type JobSeekerCreateOrConnectWithoutSkillsInput = {
    where: JobSeekerWhereUniqueInput
    create: XOR<JobSeekerCreateWithoutSkillsInput, JobSeekerUncheckedCreateWithoutSkillsInput>
  }

  export type SkillCreateWithoutSeeker_skillsInput = {
    name: string
    category?: string | null
    job_required_skills?: JobRequiredSkillCreateNestedManyWithoutSkillInput
  }

  export type SkillUncheckedCreateWithoutSeeker_skillsInput = {
    id?: number
    name: string
    category?: string | null
    job_required_skills?: JobRequiredSkillUncheckedCreateNestedManyWithoutSkillInput
  }

  export type SkillCreateOrConnectWithoutSeeker_skillsInput = {
    where: SkillWhereUniqueInput
    create: XOR<SkillCreateWithoutSeeker_skillsInput, SkillUncheckedCreateWithoutSeeker_skillsInput>
  }

  export type JobSeekerUpsertWithoutSkillsInput = {
    update: XOR<JobSeekerUpdateWithoutSkillsInput, JobSeekerUncheckedUpdateWithoutSkillsInput>
    create: XOR<JobSeekerCreateWithoutSkillsInput, JobSeekerUncheckedCreateWithoutSkillsInput>
    where?: JobSeekerWhereInput
  }

  export type JobSeekerUpdateToOneWithWhereWithoutSkillsInput = {
    where?: JobSeekerWhereInput
    data: XOR<JobSeekerUpdateWithoutSkillsInput, JobSeekerUncheckedUpdateWithoutSkillsInput>
  }

  export type JobSeekerUpdateWithoutSkillsInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    resume_text?: NullableStringFieldUpdateOperationsInput | string | null
    resume_file_path?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    experience_years?: NullableIntFieldUpdateOperationsInput | number | null
    current_job_title?: NullableStringFieldUpdateOperationsInput | string | null
    desired_job_title?: NullableStringFieldUpdateOperationsInput | string | null
    desired_salary?: NullableFloatFieldUpdateOperationsInput | number | null
    location_preference?: NullableStringFieldUpdateOperationsInput | string | null
    applications?: JobApplicationUpdateManyWithoutSeekerNestedInput
  }

  export type JobSeekerUncheckedUpdateWithoutSkillsInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    resume_text?: NullableStringFieldUpdateOperationsInput | string | null
    resume_file_path?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    experience_years?: NullableIntFieldUpdateOperationsInput | number | null
    current_job_title?: NullableStringFieldUpdateOperationsInput | string | null
    desired_job_title?: NullableStringFieldUpdateOperationsInput | string | null
    desired_salary?: NullableFloatFieldUpdateOperationsInput | number | null
    location_preference?: NullableStringFieldUpdateOperationsInput | string | null
    applications?: JobApplicationUncheckedUpdateManyWithoutSeekerNestedInput
  }

  export type SkillUpsertWithoutSeeker_skillsInput = {
    update: XOR<SkillUpdateWithoutSeeker_skillsInput, SkillUncheckedUpdateWithoutSeeker_skillsInput>
    create: XOR<SkillCreateWithoutSeeker_skillsInput, SkillUncheckedCreateWithoutSeeker_skillsInput>
    where?: SkillWhereInput
  }

  export type SkillUpdateToOneWithWhereWithoutSeeker_skillsInput = {
    where?: SkillWhereInput
    data: XOR<SkillUpdateWithoutSeeker_skillsInput, SkillUncheckedUpdateWithoutSeeker_skillsInput>
  }

  export type SkillUpdateWithoutSeeker_skillsInput = {
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    job_required_skills?: JobRequiredSkillUpdateManyWithoutSkillNestedInput
  }

  export type SkillUncheckedUpdateWithoutSeeker_skillsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    job_required_skills?: JobRequiredSkillUncheckedUpdateManyWithoutSkillNestedInput
  }

  export type JobSeekerSkillCreateWithoutSkillInput = {
    proficiency_level?: number | null
    years_of_experience?: number | null
    seeker: JobSeekerCreateNestedOneWithoutSkillsInput
  }

  export type JobSeekerSkillUncheckedCreateWithoutSkillInput = {
    id?: number
    seeker_id: number
    proficiency_level?: number | null
    years_of_experience?: number | null
  }

  export type JobSeekerSkillCreateOrConnectWithoutSkillInput = {
    where: JobSeekerSkillWhereUniqueInput
    create: XOR<JobSeekerSkillCreateWithoutSkillInput, JobSeekerSkillUncheckedCreateWithoutSkillInput>
  }

  export type JobSeekerSkillCreateManySkillInputEnvelope = {
    data: JobSeekerSkillCreateManySkillInput | JobSeekerSkillCreateManySkillInput[]
    skipDuplicates?: boolean
  }

  export type JobRequiredSkillCreateWithoutSkillInput = {
    is_required?: boolean
    importance_level?: number
    job_listing: JobListingCreateNestedOneWithoutRequired_skillsInput
  }

  export type JobRequiredSkillUncheckedCreateWithoutSkillInput = {
    id?: number
    job_id: number
    is_required?: boolean
    importance_level?: number
  }

  export type JobRequiredSkillCreateOrConnectWithoutSkillInput = {
    where: JobRequiredSkillWhereUniqueInput
    create: XOR<JobRequiredSkillCreateWithoutSkillInput, JobRequiredSkillUncheckedCreateWithoutSkillInput>
  }

  export type JobRequiredSkillCreateManySkillInputEnvelope = {
    data: JobRequiredSkillCreateManySkillInput | JobRequiredSkillCreateManySkillInput[]
    skipDuplicates?: boolean
  }

  export type JobSeekerSkillUpsertWithWhereUniqueWithoutSkillInput = {
    where: JobSeekerSkillWhereUniqueInput
    update: XOR<JobSeekerSkillUpdateWithoutSkillInput, JobSeekerSkillUncheckedUpdateWithoutSkillInput>
    create: XOR<JobSeekerSkillCreateWithoutSkillInput, JobSeekerSkillUncheckedCreateWithoutSkillInput>
  }

  export type JobSeekerSkillUpdateWithWhereUniqueWithoutSkillInput = {
    where: JobSeekerSkillWhereUniqueInput
    data: XOR<JobSeekerSkillUpdateWithoutSkillInput, JobSeekerSkillUncheckedUpdateWithoutSkillInput>
  }

  export type JobSeekerSkillUpdateManyWithWhereWithoutSkillInput = {
    where: JobSeekerSkillScalarWhereInput
    data: XOR<JobSeekerSkillUpdateManyMutationInput, JobSeekerSkillUncheckedUpdateManyWithoutSkillInput>
  }

  export type JobRequiredSkillUpsertWithWhereUniqueWithoutSkillInput = {
    where: JobRequiredSkillWhereUniqueInput
    update: XOR<JobRequiredSkillUpdateWithoutSkillInput, JobRequiredSkillUncheckedUpdateWithoutSkillInput>
    create: XOR<JobRequiredSkillCreateWithoutSkillInput, JobRequiredSkillUncheckedCreateWithoutSkillInput>
  }

  export type JobRequiredSkillUpdateWithWhereUniqueWithoutSkillInput = {
    where: JobRequiredSkillWhereUniqueInput
    data: XOR<JobRequiredSkillUpdateWithoutSkillInput, JobRequiredSkillUncheckedUpdateWithoutSkillInput>
  }

  export type JobRequiredSkillUpdateManyWithWhereWithoutSkillInput = {
    where: JobRequiredSkillScalarWhereInput
    data: XOR<JobRequiredSkillUpdateManyMutationInput, JobRequiredSkillUncheckedUpdateManyWithoutSkillInput>
  }

  export type JobListingCreateManyEmployerInput = {
    id?: number
    job_title: string
    job_description?: string | null
    job_requirements?: string | null
    job_location?: string | null
    job_type?: string | null
    salary_range_min?: number | null
    salary_range_max?: number | null
    posted_date?: Date | string
    expiration_date?: Date | string | null
    is_active?: boolean
  }

  export type JobApplicationCreateManyEmployerInput = {
    id?: number
    job_id: number
    seeker_id: number
    application_date?: Date | string
    cover_letter?: string | null
    status?: string
    notes?: string | null
  }

  export type JobListingUpdateWithoutEmployerInput = {
    job_title?: StringFieldUpdateOperationsInput | string
    job_description?: NullableStringFieldUpdateOperationsInput | string | null
    job_requirements?: NullableStringFieldUpdateOperationsInput | string | null
    job_location?: NullableStringFieldUpdateOperationsInput | string | null
    job_type?: NullableStringFieldUpdateOperationsInput | string | null
    salary_range_min?: NullableFloatFieldUpdateOperationsInput | number | null
    salary_range_max?: NullableFloatFieldUpdateOperationsInput | number | null
    posted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    expiration_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    applications?: JobApplicationUpdateManyWithoutJob_listingNestedInput
    required_skills?: JobRequiredSkillUpdateManyWithoutJob_listingNestedInput
  }

  export type JobListingUncheckedUpdateWithoutEmployerInput = {
    id?: IntFieldUpdateOperationsInput | number
    job_title?: StringFieldUpdateOperationsInput | string
    job_description?: NullableStringFieldUpdateOperationsInput | string | null
    job_requirements?: NullableStringFieldUpdateOperationsInput | string | null
    job_location?: NullableStringFieldUpdateOperationsInput | string | null
    job_type?: NullableStringFieldUpdateOperationsInput | string | null
    salary_range_min?: NullableFloatFieldUpdateOperationsInput | number | null
    salary_range_max?: NullableFloatFieldUpdateOperationsInput | number | null
    posted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    expiration_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    applications?: JobApplicationUncheckedUpdateManyWithoutJob_listingNestedInput
    required_skills?: JobRequiredSkillUncheckedUpdateManyWithoutJob_listingNestedInput
  }

  export type JobListingUncheckedUpdateManyWithoutEmployerInput = {
    id?: IntFieldUpdateOperationsInput | number
    job_title?: StringFieldUpdateOperationsInput | string
    job_description?: NullableStringFieldUpdateOperationsInput | string | null
    job_requirements?: NullableStringFieldUpdateOperationsInput | string | null
    job_location?: NullableStringFieldUpdateOperationsInput | string | null
    job_type?: NullableStringFieldUpdateOperationsInput | string | null
    salary_range_min?: NullableFloatFieldUpdateOperationsInput | number | null
    salary_range_max?: NullableFloatFieldUpdateOperationsInput | number | null
    posted_date?: DateTimeFieldUpdateOperationsInput | Date | string
    expiration_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type JobApplicationUpdateWithoutEmployerInput = {
    application_date?: DateTimeFieldUpdateOperationsInput | Date | string
    cover_letter?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    job_listing?: JobListingUpdateOneRequiredWithoutApplicationsNestedInput
    seeker?: JobSeekerUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type JobApplicationUncheckedUpdateWithoutEmployerInput = {
    id?: IntFieldUpdateOperationsInput | number
    job_id?: IntFieldUpdateOperationsInput | number
    seeker_id?: IntFieldUpdateOperationsInput | number
    application_date?: DateTimeFieldUpdateOperationsInput | Date | string
    cover_letter?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JobApplicationUncheckedUpdateManyWithoutEmployerInput = {
    id?: IntFieldUpdateOperationsInput | number
    job_id?: IntFieldUpdateOperationsInput | number
    seeker_id?: IntFieldUpdateOperationsInput | number
    application_date?: DateTimeFieldUpdateOperationsInput | Date | string
    cover_letter?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JobApplicationCreateManyJob_listingInput = {
    id?: number
    seeker_id: number
    employer_id: number
    application_date?: Date | string
    cover_letter?: string | null
    status?: string
    notes?: string | null
  }

  export type JobRequiredSkillCreateManyJob_listingInput = {
    id?: number
    skill_id: number
    is_required?: boolean
    importance_level?: number
  }

  export type JobApplicationUpdateWithoutJob_listingInput = {
    application_date?: DateTimeFieldUpdateOperationsInput | Date | string
    cover_letter?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    seeker?: JobSeekerUpdateOneRequiredWithoutApplicationsNestedInput
    employer?: EmployerUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type JobApplicationUncheckedUpdateWithoutJob_listingInput = {
    id?: IntFieldUpdateOperationsInput | number
    seeker_id?: IntFieldUpdateOperationsInput | number
    employer_id?: IntFieldUpdateOperationsInput | number
    application_date?: DateTimeFieldUpdateOperationsInput | Date | string
    cover_letter?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JobApplicationUncheckedUpdateManyWithoutJob_listingInput = {
    id?: IntFieldUpdateOperationsInput | number
    seeker_id?: IntFieldUpdateOperationsInput | number
    employer_id?: IntFieldUpdateOperationsInput | number
    application_date?: DateTimeFieldUpdateOperationsInput | Date | string
    cover_letter?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JobRequiredSkillUpdateWithoutJob_listingInput = {
    is_required?: BoolFieldUpdateOperationsInput | boolean
    importance_level?: IntFieldUpdateOperationsInput | number
    skill?: SkillUpdateOneRequiredWithoutJob_required_skillsNestedInput
  }

  export type JobRequiredSkillUncheckedUpdateWithoutJob_listingInput = {
    id?: IntFieldUpdateOperationsInput | number
    skill_id?: IntFieldUpdateOperationsInput | number
    is_required?: BoolFieldUpdateOperationsInput | boolean
    importance_level?: IntFieldUpdateOperationsInput | number
  }

  export type JobRequiredSkillUncheckedUpdateManyWithoutJob_listingInput = {
    id?: IntFieldUpdateOperationsInput | number
    skill_id?: IntFieldUpdateOperationsInput | number
    is_required?: BoolFieldUpdateOperationsInput | boolean
    importance_level?: IntFieldUpdateOperationsInput | number
  }

  export type JobApplicationCreateManySeekerInput = {
    id?: number
    job_id: number
    employer_id: number
    application_date?: Date | string
    cover_letter?: string | null
    status?: string
    notes?: string | null
  }

  export type JobSeekerSkillCreateManySeekerInput = {
    id?: number
    skill_id: number
    proficiency_level?: number | null
    years_of_experience?: number | null
  }

  export type JobApplicationUpdateWithoutSeekerInput = {
    application_date?: DateTimeFieldUpdateOperationsInput | Date | string
    cover_letter?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    job_listing?: JobListingUpdateOneRequiredWithoutApplicationsNestedInput
    employer?: EmployerUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type JobApplicationUncheckedUpdateWithoutSeekerInput = {
    id?: IntFieldUpdateOperationsInput | number
    job_id?: IntFieldUpdateOperationsInput | number
    employer_id?: IntFieldUpdateOperationsInput | number
    application_date?: DateTimeFieldUpdateOperationsInput | Date | string
    cover_letter?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JobApplicationUncheckedUpdateManyWithoutSeekerInput = {
    id?: IntFieldUpdateOperationsInput | number
    job_id?: IntFieldUpdateOperationsInput | number
    employer_id?: IntFieldUpdateOperationsInput | number
    application_date?: DateTimeFieldUpdateOperationsInput | Date | string
    cover_letter?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JobSeekerSkillUpdateWithoutSeekerInput = {
    proficiency_level?: NullableIntFieldUpdateOperationsInput | number | null
    years_of_experience?: NullableIntFieldUpdateOperationsInput | number | null
    skill?: SkillUpdateOneRequiredWithoutSeeker_skillsNestedInput
  }

  export type JobSeekerSkillUncheckedUpdateWithoutSeekerInput = {
    id?: IntFieldUpdateOperationsInput | number
    skill_id?: IntFieldUpdateOperationsInput | number
    proficiency_level?: NullableIntFieldUpdateOperationsInput | number | null
    years_of_experience?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type JobSeekerSkillUncheckedUpdateManyWithoutSeekerInput = {
    id?: IntFieldUpdateOperationsInput | number
    skill_id?: IntFieldUpdateOperationsInput | number
    proficiency_level?: NullableIntFieldUpdateOperationsInput | number | null
    years_of_experience?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type JobSeekerSkillCreateManySkillInput = {
    id?: number
    seeker_id: number
    proficiency_level?: number | null
    years_of_experience?: number | null
  }

  export type JobRequiredSkillCreateManySkillInput = {
    id?: number
    job_id: number
    is_required?: boolean
    importance_level?: number
  }

  export type JobSeekerSkillUpdateWithoutSkillInput = {
    proficiency_level?: NullableIntFieldUpdateOperationsInput | number | null
    years_of_experience?: NullableIntFieldUpdateOperationsInput | number | null
    seeker?: JobSeekerUpdateOneRequiredWithoutSkillsNestedInput
  }

  export type JobSeekerSkillUncheckedUpdateWithoutSkillInput = {
    id?: IntFieldUpdateOperationsInput | number
    seeker_id?: IntFieldUpdateOperationsInput | number
    proficiency_level?: NullableIntFieldUpdateOperationsInput | number | null
    years_of_experience?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type JobSeekerSkillUncheckedUpdateManyWithoutSkillInput = {
    id?: IntFieldUpdateOperationsInput | number
    seeker_id?: IntFieldUpdateOperationsInput | number
    proficiency_level?: NullableIntFieldUpdateOperationsInput | number | null
    years_of_experience?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type JobRequiredSkillUpdateWithoutSkillInput = {
    is_required?: BoolFieldUpdateOperationsInput | boolean
    importance_level?: IntFieldUpdateOperationsInput | number
    job_listing?: JobListingUpdateOneRequiredWithoutRequired_skillsNestedInput
  }

  export type JobRequiredSkillUncheckedUpdateWithoutSkillInput = {
    id?: IntFieldUpdateOperationsInput | number
    job_id?: IntFieldUpdateOperationsInput | number
    is_required?: BoolFieldUpdateOperationsInput | boolean
    importance_level?: IntFieldUpdateOperationsInput | number
  }

  export type JobRequiredSkillUncheckedUpdateManyWithoutSkillInput = {
    id?: IntFieldUpdateOperationsInput | number
    job_id?: IntFieldUpdateOperationsInput | number
    is_required?: BoolFieldUpdateOperationsInput | boolean
    importance_level?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}