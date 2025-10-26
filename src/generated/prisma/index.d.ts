
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
 * Model JobSeeker
 * 
 */
export type JobSeeker = $Result.DefaultSelection<Prisma.$JobSeekerPayload>
/**
 * Model Recruiter
 * 
 */
export type Recruiter = $Result.DefaultSelection<Prisma.$RecruiterPayload>
/**
 * Model Job
 * 
 */
export type Job = $Result.DefaultSelection<Prisma.$JobPayload>
/**
 * Model JobApplication
 * 
 */
export type JobApplication = $Result.DefaultSelection<Prisma.$JobApplicationPayload>
/**
 * Model Resume
 * 
 */
export type Resume = $Result.DefaultSelection<Prisma.$ResumePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more JobSeekers
 * const jobSeekers = await prisma.jobSeeker.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more JobSeekers
   * const jobSeekers = await prisma.jobSeeker.findMany()
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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

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
   * `prisma.recruiter`: Exposes CRUD operations for the **Recruiter** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Recruiters
    * const recruiters = await prisma.recruiter.findMany()
    * ```
    */
  get recruiter(): Prisma.RecruiterDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.job`: Exposes CRUD operations for the **Job** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Jobs
    * const jobs = await prisma.job.findMany()
    * ```
    */
  get job(): Prisma.JobDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.resume`: Exposes CRUD operations for the **Resume** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Resumes
    * const resumes = await prisma.resume.findMany()
    * ```
    */
  get resume(): Prisma.ResumeDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.14.0
   * Query Engine version: 717184b7b35ea05dfa71a3236b7af656013e1e49
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
    JobSeeker: 'JobSeeker',
    Recruiter: 'Recruiter',
    Job: 'Job',
    JobApplication: 'JobApplication',
    Resume: 'Resume'
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
      modelProps: "jobSeeker" | "recruiter" | "job" | "jobApplication" | "resume"
      txIsolationLevel: never
    }
    model: {
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
          findRaw: {
            args: Prisma.JobSeekerFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.JobSeekerAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.JobSeekerCountArgs<ExtArgs>
            result: $Utils.Optional<JobSeekerCountAggregateOutputType> | number
          }
        }
      }
      Recruiter: {
        payload: Prisma.$RecruiterPayload<ExtArgs>
        fields: Prisma.RecruiterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecruiterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecruiterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterPayload>
          }
          findFirst: {
            args: Prisma.RecruiterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecruiterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterPayload>
          }
          findMany: {
            args: Prisma.RecruiterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterPayload>[]
          }
          create: {
            args: Prisma.RecruiterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterPayload>
          }
          createMany: {
            args: Prisma.RecruiterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RecruiterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterPayload>
          }
          update: {
            args: Prisma.RecruiterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterPayload>
          }
          deleteMany: {
            args: Prisma.RecruiterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecruiterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RecruiterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecruiterPayload>
          }
          aggregate: {
            args: Prisma.RecruiterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecruiter>
          }
          groupBy: {
            args: Prisma.RecruiterGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecruiterGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.RecruiterFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.RecruiterAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.RecruiterCountArgs<ExtArgs>
            result: $Utils.Optional<RecruiterCountAggregateOutputType> | number
          }
        }
      }
      Job: {
        payload: Prisma.$JobPayload<ExtArgs>
        fields: Prisma.JobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          findFirst: {
            args: Prisma.JobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          findMany: {
            args: Prisma.JobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          create: {
            args: Prisma.JobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          createMany: {
            args: Prisma.JobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.JobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          update: {
            args: Prisma.JobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          deleteMany: {
            args: Prisma.JobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.JobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          aggregate: {
            args: Prisma.JobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJob>
          }
          groupBy: {
            args: Prisma.JobGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.JobFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.JobAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.JobCountArgs<ExtArgs>
            result: $Utils.Optional<JobCountAggregateOutputType> | number
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
          findRaw: {
            args: Prisma.JobApplicationFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.JobApplicationAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.JobApplicationCountArgs<ExtArgs>
            result: $Utils.Optional<JobApplicationCountAggregateOutputType> | number
          }
        }
      }
      Resume: {
        payload: Prisma.$ResumePayload<ExtArgs>
        fields: Prisma.ResumeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResumeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResumeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          findFirst: {
            args: Prisma.ResumeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResumeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          findMany: {
            args: Prisma.ResumeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>[]
          }
          create: {
            args: Prisma.ResumeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          createMany: {
            args: Prisma.ResumeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ResumeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          update: {
            args: Prisma.ResumeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          deleteMany: {
            args: Prisma.ResumeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResumeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ResumeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          aggregate: {
            args: Prisma.ResumeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResume>
          }
          groupBy: {
            args: Prisma.ResumeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResumeGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ResumeFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ResumeAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ResumeCountArgs<ExtArgs>
            result: $Utils.Optional<ResumeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
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
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
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
    jobSeeker?: JobSeekerOmit
    recruiter?: RecruiterOmit
    job?: JobOmit
    jobApplication?: JobApplicationOmit
    resume?: ResumeOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
   * Count Type JobSeekerCountOutputType
   */

  export type JobSeekerCountOutputType = {
    applications: number
    resumes: number
  }

  export type JobSeekerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | JobSeekerCountOutputTypeCountApplicationsArgs
    resumes?: boolean | JobSeekerCountOutputTypeCountResumesArgs
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
  export type JobSeekerCountOutputTypeCountResumesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResumeWhereInput
  }


  /**
   * Count Type RecruiterCountOutputType
   */

  export type RecruiterCountOutputType = {
    jobs: number
    applications: number
  }

  export type RecruiterCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobs?: boolean | RecruiterCountOutputTypeCountJobsArgs
    applications?: boolean | RecruiterCountOutputTypeCountApplicationsArgs
  }

  // Custom InputTypes
  /**
   * RecruiterCountOutputType without action
   */
  export type RecruiterCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecruiterCountOutputType
     */
    select?: RecruiterCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RecruiterCountOutputType without action
   */
  export type RecruiterCountOutputTypeCountJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
  }

  /**
   * RecruiterCountOutputType without action
   */
  export type RecruiterCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobApplicationWhereInput
  }


  /**
   * Count Type JobCountOutputType
   */

  export type JobCountOutputType = {
    applications: number
  }

  export type JobCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | JobCountOutputTypeCountApplicationsArgs
  }

  // Custom InputTypes
  /**
   * JobCountOutputType without action
   */
  export type JobCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCountOutputType
     */
    select?: JobCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * JobCountOutputType without action
   */
  export type JobCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobApplicationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model JobSeeker
   */

  export type AggregateJobSeeker = {
    _count: JobSeekerCountAggregateOutputType | null
    _min: JobSeekerMinAggregateOutputType | null
    _max: JobSeekerMaxAggregateOutputType | null
  }

  export type JobSeekerMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    fullName: string | null
    phone: string | null
    currentJobTitle: string | null
    yearsOfExperience: string | null
    education: string | null
    resume: string | null
    city: string | null
    state: string | null
    country: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isActive: boolean | null
    lastLogin: Date | null
    profileComplete: boolean | null
    emailVerified: boolean | null
    phoneVerified: boolean | null
    bio: string | null
    linkedinUrl: string | null
    githubUrl: string | null
    portfolioUrl: string | null
    expectedSalary: string | null
    noticePeriod: string | null
  }

  export type JobSeekerMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    fullName: string | null
    phone: string | null
    currentJobTitle: string | null
    yearsOfExperience: string | null
    education: string | null
    resume: string | null
    city: string | null
    state: string | null
    country: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isActive: boolean | null
    lastLogin: Date | null
    profileComplete: boolean | null
    emailVerified: boolean | null
    phoneVerified: boolean | null
    bio: string | null
    linkedinUrl: string | null
    githubUrl: string | null
    portfolioUrl: string | null
    expectedSalary: string | null
    noticePeriod: string | null
  }

  export type JobSeekerCountAggregateOutputType = {
    id: number
    email: number
    password: number
    fullName: number
    phone: number
    currentJobTitle: number
    yearsOfExperience: number
    education: number
    skills: number
    resume: number
    city: number
    state: number
    country: number
    createdAt: number
    updatedAt: number
    isActive: number
    lastLogin: number
    profileComplete: number
    emailVerified: number
    phoneVerified: number
    bio: number
    linkedinUrl: number
    githubUrl: number
    portfolioUrl: number
    preferredJobTypes: number
    expectedSalary: number
    noticePeriod: number
    languages: number
    certifications: number
    _all: number
  }


  export type JobSeekerMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    fullName?: true
    phone?: true
    currentJobTitle?: true
    yearsOfExperience?: true
    education?: true
    resume?: true
    city?: true
    state?: true
    country?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
    lastLogin?: true
    profileComplete?: true
    emailVerified?: true
    phoneVerified?: true
    bio?: true
    linkedinUrl?: true
    githubUrl?: true
    portfolioUrl?: true
    expectedSalary?: true
    noticePeriod?: true
  }

  export type JobSeekerMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    fullName?: true
    phone?: true
    currentJobTitle?: true
    yearsOfExperience?: true
    education?: true
    resume?: true
    city?: true
    state?: true
    country?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
    lastLogin?: true
    profileComplete?: true
    emailVerified?: true
    phoneVerified?: true
    bio?: true
    linkedinUrl?: true
    githubUrl?: true
    portfolioUrl?: true
    expectedSalary?: true
    noticePeriod?: true
  }

  export type JobSeekerCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    fullName?: true
    phone?: true
    currentJobTitle?: true
    yearsOfExperience?: true
    education?: true
    skills?: true
    resume?: true
    city?: true
    state?: true
    country?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
    lastLogin?: true
    profileComplete?: true
    emailVerified?: true
    phoneVerified?: true
    bio?: true
    linkedinUrl?: true
    githubUrl?: true
    portfolioUrl?: true
    preferredJobTypes?: true
    expectedSalary?: true
    noticePeriod?: true
    languages?: true
    certifications?: true
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
    _min?: JobSeekerMinAggregateInputType
    _max?: JobSeekerMaxAggregateInputType
  }

  export type JobSeekerGroupByOutputType = {
    id: string
    email: string
    password: string | null
    fullName: string
    phone: string | null
    currentJobTitle: string | null
    yearsOfExperience: string | null
    education: string | null
    skills: string[]
    resume: string | null
    city: string | null
    state: string | null
    country: string | null
    createdAt: Date
    updatedAt: Date
    isActive: boolean
    lastLogin: Date | null
    profileComplete: boolean
    emailVerified: boolean
    phoneVerified: boolean
    bio: string | null
    linkedinUrl: string | null
    githubUrl: string | null
    portfolioUrl: string | null
    preferredJobTypes: string[]
    expectedSalary: string | null
    noticePeriod: string | null
    languages: string[]
    certifications: string[]
    _count: JobSeekerCountAggregateOutputType | null
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
    email?: boolean
    password?: boolean
    fullName?: boolean
    phone?: boolean
    currentJobTitle?: boolean
    yearsOfExperience?: boolean
    education?: boolean
    skills?: boolean
    resume?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
    lastLogin?: boolean
    profileComplete?: boolean
    emailVerified?: boolean
    phoneVerified?: boolean
    bio?: boolean
    linkedinUrl?: boolean
    githubUrl?: boolean
    portfolioUrl?: boolean
    preferredJobTypes?: boolean
    expectedSalary?: boolean
    noticePeriod?: boolean
    languages?: boolean
    certifications?: boolean
    applications?: boolean | JobSeeker$applicationsArgs<ExtArgs>
    resumes?: boolean | JobSeeker$resumesArgs<ExtArgs>
    _count?: boolean | JobSeekerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobSeeker"]>



  export type JobSeekerSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    fullName?: boolean
    phone?: boolean
    currentJobTitle?: boolean
    yearsOfExperience?: boolean
    education?: boolean
    skills?: boolean
    resume?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
    lastLogin?: boolean
    profileComplete?: boolean
    emailVerified?: boolean
    phoneVerified?: boolean
    bio?: boolean
    linkedinUrl?: boolean
    githubUrl?: boolean
    portfolioUrl?: boolean
    preferredJobTypes?: boolean
    expectedSalary?: boolean
    noticePeriod?: boolean
    languages?: boolean
    certifications?: boolean
  }

  export type JobSeekerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "fullName" | "phone" | "currentJobTitle" | "yearsOfExperience" | "education" | "skills" | "resume" | "city" | "state" | "country" | "createdAt" | "updatedAt" | "isActive" | "lastLogin" | "profileComplete" | "emailVerified" | "phoneVerified" | "bio" | "linkedinUrl" | "githubUrl" | "portfolioUrl" | "preferredJobTypes" | "expectedSalary" | "noticePeriod" | "languages" | "certifications", ExtArgs["result"]["jobSeeker"]>
  export type JobSeekerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | JobSeeker$applicationsArgs<ExtArgs>
    resumes?: boolean | JobSeeker$resumesArgs<ExtArgs>
    _count?: boolean | JobSeekerCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $JobSeekerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobSeeker"
    objects: {
      applications: Prisma.$JobApplicationPayload<ExtArgs>[]
      resumes: Prisma.$ResumePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string | null
      fullName: string
      phone: string | null
      currentJobTitle: string | null
      yearsOfExperience: string | null
      education: string | null
      skills: string[]
      resume: string | null
      city: string | null
      state: string | null
      country: string | null
      createdAt: Date
      updatedAt: Date
      isActive: boolean
      lastLogin: Date | null
      profileComplete: boolean
      emailVerified: boolean
      phoneVerified: boolean
      bio: string | null
      linkedinUrl: string | null
      githubUrl: string | null
      portfolioUrl: string | null
      preferredJobTypes: string[]
      expectedSalary: string | null
      noticePeriod: string | null
      languages: string[]
      certifications: string[]
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
     * Find zero or more JobSeekers that matches the filter.
     * @param {JobSeekerFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const jobSeeker = await prisma.jobSeeker.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: JobSeekerFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a JobSeeker.
     * @param {JobSeekerAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const jobSeeker = await prisma.jobSeeker.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: JobSeekerAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


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
    resumes<T extends JobSeeker$resumesArgs<ExtArgs> = {}>(args?: Subset<T, JobSeeker$resumesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly id: FieldRef<"JobSeeker", 'String'>
    readonly email: FieldRef<"JobSeeker", 'String'>
    readonly password: FieldRef<"JobSeeker", 'String'>
    readonly fullName: FieldRef<"JobSeeker", 'String'>
    readonly phone: FieldRef<"JobSeeker", 'String'>
    readonly currentJobTitle: FieldRef<"JobSeeker", 'String'>
    readonly yearsOfExperience: FieldRef<"JobSeeker", 'String'>
    readonly education: FieldRef<"JobSeeker", 'String'>
    readonly skills: FieldRef<"JobSeeker", 'String[]'>
    readonly resume: FieldRef<"JobSeeker", 'String'>
    readonly city: FieldRef<"JobSeeker", 'String'>
    readonly state: FieldRef<"JobSeeker", 'String'>
    readonly country: FieldRef<"JobSeeker", 'String'>
    readonly createdAt: FieldRef<"JobSeeker", 'DateTime'>
    readonly updatedAt: FieldRef<"JobSeeker", 'DateTime'>
    readonly isActive: FieldRef<"JobSeeker", 'Boolean'>
    readonly lastLogin: FieldRef<"JobSeeker", 'DateTime'>
    readonly profileComplete: FieldRef<"JobSeeker", 'Boolean'>
    readonly emailVerified: FieldRef<"JobSeeker", 'Boolean'>
    readonly phoneVerified: FieldRef<"JobSeeker", 'Boolean'>
    readonly bio: FieldRef<"JobSeeker", 'String'>
    readonly linkedinUrl: FieldRef<"JobSeeker", 'String'>
    readonly githubUrl: FieldRef<"JobSeeker", 'String'>
    readonly portfolioUrl: FieldRef<"JobSeeker", 'String'>
    readonly preferredJobTypes: FieldRef<"JobSeeker", 'String[]'>
    readonly expectedSalary: FieldRef<"JobSeeker", 'String'>
    readonly noticePeriod: FieldRef<"JobSeeker", 'String'>
    readonly languages: FieldRef<"JobSeeker", 'String[]'>
    readonly certifications: FieldRef<"JobSeeker", 'String[]'>
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
   * JobSeeker findRaw
   */
  export type JobSeekerFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * JobSeeker aggregateRaw
   */
  export type JobSeekerAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
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
   * JobSeeker.resumes
   */
  export type JobSeeker$resumesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    where?: ResumeWhereInput
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    cursor?: ResumeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
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
   * Model Recruiter
   */

  export type AggregateRecruiter = {
    _count: RecruiterCountAggregateOutputType | null
    _min: RecruiterMinAggregateOutputType | null
    _max: RecruiterMaxAggregateOutputType | null
  }

  export type RecruiterMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    companyName: string | null
    fullName: string | null
    phone: string | null
    position: string | null
    companySize: string | null
    industry: string | null
    website: string | null
    city: string | null
    state: string | null
    country: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isActive: boolean | null
    lastLogin: Date | null
    profileComplete: boolean | null
    emailVerified: boolean | null
    phoneVerified: boolean | null
    bio: string | null
    linkedinUrl: string | null
    companyDescription: string | null
    companyLogo: string | null
  }

  export type RecruiterMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    companyName: string | null
    fullName: string | null
    phone: string | null
    position: string | null
    companySize: string | null
    industry: string | null
    website: string | null
    city: string | null
    state: string | null
    country: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isActive: boolean | null
    lastLogin: Date | null
    profileComplete: boolean | null
    emailVerified: boolean | null
    phoneVerified: boolean | null
    bio: string | null
    linkedinUrl: string | null
    companyDescription: string | null
    companyLogo: string | null
  }

  export type RecruiterCountAggregateOutputType = {
    id: number
    email: number
    password: number
    companyName: number
    fullName: number
    phone: number
    position: number
    companySize: number
    industry: number
    website: number
    city: number
    state: number
    country: number
    createdAt: number
    updatedAt: number
    isActive: number
    lastLogin: number
    profileComplete: number
    emailVerified: number
    phoneVerified: number
    bio: number
    linkedinUrl: number
    companyDescription: number
    companyLogo: number
    companyBenefits: number
    hiringNeeds: number
    preferredLocations: number
    _all: number
  }


  export type RecruiterMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    companyName?: true
    fullName?: true
    phone?: true
    position?: true
    companySize?: true
    industry?: true
    website?: true
    city?: true
    state?: true
    country?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
    lastLogin?: true
    profileComplete?: true
    emailVerified?: true
    phoneVerified?: true
    bio?: true
    linkedinUrl?: true
    companyDescription?: true
    companyLogo?: true
  }

  export type RecruiterMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    companyName?: true
    fullName?: true
    phone?: true
    position?: true
    companySize?: true
    industry?: true
    website?: true
    city?: true
    state?: true
    country?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
    lastLogin?: true
    profileComplete?: true
    emailVerified?: true
    phoneVerified?: true
    bio?: true
    linkedinUrl?: true
    companyDescription?: true
    companyLogo?: true
  }

  export type RecruiterCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    companyName?: true
    fullName?: true
    phone?: true
    position?: true
    companySize?: true
    industry?: true
    website?: true
    city?: true
    state?: true
    country?: true
    createdAt?: true
    updatedAt?: true
    isActive?: true
    lastLogin?: true
    profileComplete?: true
    emailVerified?: true
    phoneVerified?: true
    bio?: true
    linkedinUrl?: true
    companyDescription?: true
    companyLogo?: true
    companyBenefits?: true
    hiringNeeds?: true
    preferredLocations?: true
    _all?: true
  }

  export type RecruiterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recruiter to aggregate.
     */
    where?: RecruiterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recruiters to fetch.
     */
    orderBy?: RecruiterOrderByWithRelationInput | RecruiterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecruiterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recruiters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recruiters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Recruiters
    **/
    _count?: true | RecruiterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecruiterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecruiterMaxAggregateInputType
  }

  export type GetRecruiterAggregateType<T extends RecruiterAggregateArgs> = {
        [P in keyof T & keyof AggregateRecruiter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecruiter[P]>
      : GetScalarType<T[P], AggregateRecruiter[P]>
  }




  export type RecruiterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecruiterWhereInput
    orderBy?: RecruiterOrderByWithAggregationInput | RecruiterOrderByWithAggregationInput[]
    by: RecruiterScalarFieldEnum[] | RecruiterScalarFieldEnum
    having?: RecruiterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecruiterCountAggregateInputType | true
    _min?: RecruiterMinAggregateInputType
    _max?: RecruiterMaxAggregateInputType
  }

  export type RecruiterGroupByOutputType = {
    id: string
    email: string
    password: string | null
    companyName: string
    fullName: string
    phone: string | null
    position: string | null
    companySize: string | null
    industry: string | null
    website: string | null
    city: string | null
    state: string | null
    country: string | null
    createdAt: Date
    updatedAt: Date
    isActive: boolean
    lastLogin: Date | null
    profileComplete: boolean
    emailVerified: boolean
    phoneVerified: boolean
    bio: string | null
    linkedinUrl: string | null
    companyDescription: string | null
    companyLogo: string | null
    companyBenefits: string[]
    hiringNeeds: string[]
    preferredLocations: string[]
    _count: RecruiterCountAggregateOutputType | null
    _min: RecruiterMinAggregateOutputType | null
    _max: RecruiterMaxAggregateOutputType | null
  }

  type GetRecruiterGroupByPayload<T extends RecruiterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecruiterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecruiterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecruiterGroupByOutputType[P]>
            : GetScalarType<T[P], RecruiterGroupByOutputType[P]>
        }
      >
    >


  export type RecruiterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    companyName?: boolean
    fullName?: boolean
    phone?: boolean
    position?: boolean
    companySize?: boolean
    industry?: boolean
    website?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
    lastLogin?: boolean
    profileComplete?: boolean
    emailVerified?: boolean
    phoneVerified?: boolean
    bio?: boolean
    linkedinUrl?: boolean
    companyDescription?: boolean
    companyLogo?: boolean
    companyBenefits?: boolean
    hiringNeeds?: boolean
    preferredLocations?: boolean
    jobs?: boolean | Recruiter$jobsArgs<ExtArgs>
    applications?: boolean | Recruiter$applicationsArgs<ExtArgs>
    _count?: boolean | RecruiterCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recruiter"]>



  export type RecruiterSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    companyName?: boolean
    fullName?: boolean
    phone?: boolean
    position?: boolean
    companySize?: boolean
    industry?: boolean
    website?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isActive?: boolean
    lastLogin?: boolean
    profileComplete?: boolean
    emailVerified?: boolean
    phoneVerified?: boolean
    bio?: boolean
    linkedinUrl?: boolean
    companyDescription?: boolean
    companyLogo?: boolean
    companyBenefits?: boolean
    hiringNeeds?: boolean
    preferredLocations?: boolean
  }

  export type RecruiterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "companyName" | "fullName" | "phone" | "position" | "companySize" | "industry" | "website" | "city" | "state" | "country" | "createdAt" | "updatedAt" | "isActive" | "lastLogin" | "profileComplete" | "emailVerified" | "phoneVerified" | "bio" | "linkedinUrl" | "companyDescription" | "companyLogo" | "companyBenefits" | "hiringNeeds" | "preferredLocations", ExtArgs["result"]["recruiter"]>
  export type RecruiterInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobs?: boolean | Recruiter$jobsArgs<ExtArgs>
    applications?: boolean | Recruiter$applicationsArgs<ExtArgs>
    _count?: boolean | RecruiterCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $RecruiterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Recruiter"
    objects: {
      jobs: Prisma.$JobPayload<ExtArgs>[]
      applications: Prisma.$JobApplicationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string | null
      companyName: string
      fullName: string
      phone: string | null
      position: string | null
      companySize: string | null
      industry: string | null
      website: string | null
      city: string | null
      state: string | null
      country: string | null
      createdAt: Date
      updatedAt: Date
      isActive: boolean
      lastLogin: Date | null
      profileComplete: boolean
      emailVerified: boolean
      phoneVerified: boolean
      bio: string | null
      linkedinUrl: string | null
      companyDescription: string | null
      companyLogo: string | null
      companyBenefits: string[]
      hiringNeeds: string[]
      preferredLocations: string[]
    }, ExtArgs["result"]["recruiter"]>
    composites: {}
  }

  type RecruiterGetPayload<S extends boolean | null | undefined | RecruiterDefaultArgs> = $Result.GetResult<Prisma.$RecruiterPayload, S>

  type RecruiterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecruiterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecruiterCountAggregateInputType | true
    }

  export interface RecruiterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Recruiter'], meta: { name: 'Recruiter' } }
    /**
     * Find zero or one Recruiter that matches the filter.
     * @param {RecruiterFindUniqueArgs} args - Arguments to find a Recruiter
     * @example
     * // Get one Recruiter
     * const recruiter = await prisma.recruiter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecruiterFindUniqueArgs>(args: SelectSubset<T, RecruiterFindUniqueArgs<ExtArgs>>): Prisma__RecruiterClient<$Result.GetResult<Prisma.$RecruiterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Recruiter that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecruiterFindUniqueOrThrowArgs} args - Arguments to find a Recruiter
     * @example
     * // Get one Recruiter
     * const recruiter = await prisma.recruiter.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecruiterFindUniqueOrThrowArgs>(args: SelectSubset<T, RecruiterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecruiterClient<$Result.GetResult<Prisma.$RecruiterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recruiter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterFindFirstArgs} args - Arguments to find a Recruiter
     * @example
     * // Get one Recruiter
     * const recruiter = await prisma.recruiter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecruiterFindFirstArgs>(args?: SelectSubset<T, RecruiterFindFirstArgs<ExtArgs>>): Prisma__RecruiterClient<$Result.GetResult<Prisma.$RecruiterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recruiter that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterFindFirstOrThrowArgs} args - Arguments to find a Recruiter
     * @example
     * // Get one Recruiter
     * const recruiter = await prisma.recruiter.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecruiterFindFirstOrThrowArgs>(args?: SelectSubset<T, RecruiterFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecruiterClient<$Result.GetResult<Prisma.$RecruiterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Recruiters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Recruiters
     * const recruiters = await prisma.recruiter.findMany()
     * 
     * // Get first 10 Recruiters
     * const recruiters = await prisma.recruiter.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recruiterWithIdOnly = await prisma.recruiter.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecruiterFindManyArgs>(args?: SelectSubset<T, RecruiterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecruiterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Recruiter.
     * @param {RecruiterCreateArgs} args - Arguments to create a Recruiter.
     * @example
     * // Create one Recruiter
     * const Recruiter = await prisma.recruiter.create({
     *   data: {
     *     // ... data to create a Recruiter
     *   }
     * })
     * 
     */
    create<T extends RecruiterCreateArgs>(args: SelectSubset<T, RecruiterCreateArgs<ExtArgs>>): Prisma__RecruiterClient<$Result.GetResult<Prisma.$RecruiterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Recruiters.
     * @param {RecruiterCreateManyArgs} args - Arguments to create many Recruiters.
     * @example
     * // Create many Recruiters
     * const recruiter = await prisma.recruiter.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecruiterCreateManyArgs>(args?: SelectSubset<T, RecruiterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Recruiter.
     * @param {RecruiterDeleteArgs} args - Arguments to delete one Recruiter.
     * @example
     * // Delete one Recruiter
     * const Recruiter = await prisma.recruiter.delete({
     *   where: {
     *     // ... filter to delete one Recruiter
     *   }
     * })
     * 
     */
    delete<T extends RecruiterDeleteArgs>(args: SelectSubset<T, RecruiterDeleteArgs<ExtArgs>>): Prisma__RecruiterClient<$Result.GetResult<Prisma.$RecruiterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Recruiter.
     * @param {RecruiterUpdateArgs} args - Arguments to update one Recruiter.
     * @example
     * // Update one Recruiter
     * const recruiter = await prisma.recruiter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecruiterUpdateArgs>(args: SelectSubset<T, RecruiterUpdateArgs<ExtArgs>>): Prisma__RecruiterClient<$Result.GetResult<Prisma.$RecruiterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Recruiters.
     * @param {RecruiterDeleteManyArgs} args - Arguments to filter Recruiters to delete.
     * @example
     * // Delete a few Recruiters
     * const { count } = await prisma.recruiter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecruiterDeleteManyArgs>(args?: SelectSubset<T, RecruiterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recruiters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Recruiters
     * const recruiter = await prisma.recruiter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecruiterUpdateManyArgs>(args: SelectSubset<T, RecruiterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Recruiter.
     * @param {RecruiterUpsertArgs} args - Arguments to update or create a Recruiter.
     * @example
     * // Update or create a Recruiter
     * const recruiter = await prisma.recruiter.upsert({
     *   create: {
     *     // ... data to create a Recruiter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Recruiter we want to update
     *   }
     * })
     */
    upsert<T extends RecruiterUpsertArgs>(args: SelectSubset<T, RecruiterUpsertArgs<ExtArgs>>): Prisma__RecruiterClient<$Result.GetResult<Prisma.$RecruiterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Recruiters that matches the filter.
     * @param {RecruiterFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const recruiter = await prisma.recruiter.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: RecruiterFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Recruiter.
     * @param {RecruiterAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const recruiter = await prisma.recruiter.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: RecruiterAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Recruiters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterCountArgs} args - Arguments to filter Recruiters to count.
     * @example
     * // Count the number of Recruiters
     * const count = await prisma.recruiter.count({
     *   where: {
     *     // ... the filter for the Recruiters we want to count
     *   }
     * })
    **/
    count<T extends RecruiterCountArgs>(
      args?: Subset<T, RecruiterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecruiterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Recruiter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RecruiterAggregateArgs>(args: Subset<T, RecruiterAggregateArgs>): Prisma.PrismaPromise<GetRecruiterAggregateType<T>>

    /**
     * Group by Recruiter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecruiterGroupByArgs} args - Group by arguments.
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
      T extends RecruiterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecruiterGroupByArgs['orderBy'] }
        : { orderBy?: RecruiterGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RecruiterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecruiterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Recruiter model
   */
  readonly fields: RecruiterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Recruiter.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecruiterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    jobs<T extends Recruiter$jobsArgs<ExtArgs> = {}>(args?: Subset<T, Recruiter$jobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    applications<T extends Recruiter$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, Recruiter$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Recruiter model
   */
  interface RecruiterFieldRefs {
    readonly id: FieldRef<"Recruiter", 'String'>
    readonly email: FieldRef<"Recruiter", 'String'>
    readonly password: FieldRef<"Recruiter", 'String'>
    readonly companyName: FieldRef<"Recruiter", 'String'>
    readonly fullName: FieldRef<"Recruiter", 'String'>
    readonly phone: FieldRef<"Recruiter", 'String'>
    readonly position: FieldRef<"Recruiter", 'String'>
    readonly companySize: FieldRef<"Recruiter", 'String'>
    readonly industry: FieldRef<"Recruiter", 'String'>
    readonly website: FieldRef<"Recruiter", 'String'>
    readonly city: FieldRef<"Recruiter", 'String'>
    readonly state: FieldRef<"Recruiter", 'String'>
    readonly country: FieldRef<"Recruiter", 'String'>
    readonly createdAt: FieldRef<"Recruiter", 'DateTime'>
    readonly updatedAt: FieldRef<"Recruiter", 'DateTime'>
    readonly isActive: FieldRef<"Recruiter", 'Boolean'>
    readonly lastLogin: FieldRef<"Recruiter", 'DateTime'>
    readonly profileComplete: FieldRef<"Recruiter", 'Boolean'>
    readonly emailVerified: FieldRef<"Recruiter", 'Boolean'>
    readonly phoneVerified: FieldRef<"Recruiter", 'Boolean'>
    readonly bio: FieldRef<"Recruiter", 'String'>
    readonly linkedinUrl: FieldRef<"Recruiter", 'String'>
    readonly companyDescription: FieldRef<"Recruiter", 'String'>
    readonly companyLogo: FieldRef<"Recruiter", 'String'>
    readonly companyBenefits: FieldRef<"Recruiter", 'String[]'>
    readonly hiringNeeds: FieldRef<"Recruiter", 'String[]'>
    readonly preferredLocations: FieldRef<"Recruiter", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * Recruiter findUnique
   */
  export type RecruiterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recruiter
     */
    select?: RecruiterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recruiter
     */
    omit?: RecruiterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterInclude<ExtArgs> | null
    /**
     * Filter, which Recruiter to fetch.
     */
    where: RecruiterWhereUniqueInput
  }

  /**
   * Recruiter findUniqueOrThrow
   */
  export type RecruiterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recruiter
     */
    select?: RecruiterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recruiter
     */
    omit?: RecruiterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterInclude<ExtArgs> | null
    /**
     * Filter, which Recruiter to fetch.
     */
    where: RecruiterWhereUniqueInput
  }

  /**
   * Recruiter findFirst
   */
  export type RecruiterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recruiter
     */
    select?: RecruiterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recruiter
     */
    omit?: RecruiterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterInclude<ExtArgs> | null
    /**
     * Filter, which Recruiter to fetch.
     */
    where?: RecruiterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recruiters to fetch.
     */
    orderBy?: RecruiterOrderByWithRelationInput | RecruiterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recruiters.
     */
    cursor?: RecruiterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recruiters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recruiters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recruiters.
     */
    distinct?: RecruiterScalarFieldEnum | RecruiterScalarFieldEnum[]
  }

  /**
   * Recruiter findFirstOrThrow
   */
  export type RecruiterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recruiter
     */
    select?: RecruiterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recruiter
     */
    omit?: RecruiterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterInclude<ExtArgs> | null
    /**
     * Filter, which Recruiter to fetch.
     */
    where?: RecruiterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recruiters to fetch.
     */
    orderBy?: RecruiterOrderByWithRelationInput | RecruiterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recruiters.
     */
    cursor?: RecruiterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recruiters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recruiters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recruiters.
     */
    distinct?: RecruiterScalarFieldEnum | RecruiterScalarFieldEnum[]
  }

  /**
   * Recruiter findMany
   */
  export type RecruiterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recruiter
     */
    select?: RecruiterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recruiter
     */
    omit?: RecruiterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterInclude<ExtArgs> | null
    /**
     * Filter, which Recruiters to fetch.
     */
    where?: RecruiterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recruiters to fetch.
     */
    orderBy?: RecruiterOrderByWithRelationInput | RecruiterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Recruiters.
     */
    cursor?: RecruiterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recruiters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recruiters.
     */
    skip?: number
    distinct?: RecruiterScalarFieldEnum | RecruiterScalarFieldEnum[]
  }

  /**
   * Recruiter create
   */
  export type RecruiterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recruiter
     */
    select?: RecruiterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recruiter
     */
    omit?: RecruiterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterInclude<ExtArgs> | null
    /**
     * The data needed to create a Recruiter.
     */
    data: XOR<RecruiterCreateInput, RecruiterUncheckedCreateInput>
  }

  /**
   * Recruiter createMany
   */
  export type RecruiterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Recruiters.
     */
    data: RecruiterCreateManyInput | RecruiterCreateManyInput[]
  }

  /**
   * Recruiter update
   */
  export type RecruiterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recruiter
     */
    select?: RecruiterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recruiter
     */
    omit?: RecruiterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterInclude<ExtArgs> | null
    /**
     * The data needed to update a Recruiter.
     */
    data: XOR<RecruiterUpdateInput, RecruiterUncheckedUpdateInput>
    /**
     * Choose, which Recruiter to update.
     */
    where: RecruiterWhereUniqueInput
  }

  /**
   * Recruiter updateMany
   */
  export type RecruiterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Recruiters.
     */
    data: XOR<RecruiterUpdateManyMutationInput, RecruiterUncheckedUpdateManyInput>
    /**
     * Filter which Recruiters to update
     */
    where?: RecruiterWhereInput
    /**
     * Limit how many Recruiters to update.
     */
    limit?: number
  }

  /**
   * Recruiter upsert
   */
  export type RecruiterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recruiter
     */
    select?: RecruiterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recruiter
     */
    omit?: RecruiterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterInclude<ExtArgs> | null
    /**
     * The filter to search for the Recruiter to update in case it exists.
     */
    where: RecruiterWhereUniqueInput
    /**
     * In case the Recruiter found by the `where` argument doesn't exist, create a new Recruiter with this data.
     */
    create: XOR<RecruiterCreateInput, RecruiterUncheckedCreateInput>
    /**
     * In case the Recruiter was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecruiterUpdateInput, RecruiterUncheckedUpdateInput>
  }

  /**
   * Recruiter delete
   */
  export type RecruiterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recruiter
     */
    select?: RecruiterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recruiter
     */
    omit?: RecruiterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterInclude<ExtArgs> | null
    /**
     * Filter which Recruiter to delete.
     */
    where: RecruiterWhereUniqueInput
  }

  /**
   * Recruiter deleteMany
   */
  export type RecruiterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recruiters to delete
     */
    where?: RecruiterWhereInput
    /**
     * Limit how many Recruiters to delete.
     */
    limit?: number
  }

  /**
   * Recruiter findRaw
   */
  export type RecruiterFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Recruiter aggregateRaw
   */
  export type RecruiterAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Recruiter.jobs
   */
  export type Recruiter$jobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    where?: JobWhereInput
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    cursor?: JobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Recruiter.applications
   */
  export type Recruiter$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Recruiter without action
   */
  export type RecruiterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recruiter
     */
    select?: RecruiterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recruiter
     */
    omit?: RecruiterOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecruiterInclude<ExtArgs> | null
  }


  /**
   * Model Job
   */

  export type AggregateJob = {
    _count: JobCountAggregateOutputType | null
    _avg: JobAvgAggregateOutputType | null
    _sum: JobSumAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  export type JobAvgAggregateOutputType = {
    salaryMin: number | null
    salaryMax: number | null
    applicantsCount: number | null
  }

  export type JobSumAggregateOutputType = {
    salaryMin: number | null
    salaryMax: number | null
    applicantsCount: number | null
  }

  export type JobMinAggregateOutputType = {
    id: string | null
    title: string | null
    department: string | null
    company: string | null
    companyId: string | null
    location: string | null
    locationType: string | null
    employmentType: string | null
    experienceLevel: string | null
    salaryMin: number | null
    salaryMax: number | null
    salaryCurrency: string | null
    salaryPeriod: string | null
    description: string | null
    applicationDeadline: string | null
    applicationUrl: string | null
    postedDate: Date | null
    postedBy: string | null
    applicantsCount: number | null
  }

  export type JobMaxAggregateOutputType = {
    id: string | null
    title: string | null
    department: string | null
    company: string | null
    companyId: string | null
    location: string | null
    locationType: string | null
    employmentType: string | null
    experienceLevel: string | null
    salaryMin: number | null
    salaryMax: number | null
    salaryCurrency: string | null
    salaryPeriod: string | null
    description: string | null
    applicationDeadline: string | null
    applicationUrl: string | null
    postedDate: Date | null
    postedBy: string | null
    applicantsCount: number | null
  }

  export type JobCountAggregateOutputType = {
    id: number
    title: number
    department: number
    company: number
    companyId: number
    location: number
    locationType: number
    employmentType: number
    experienceLevel: number
    salaryMin: number
    salaryMax: number
    salaryCurrency: number
    salaryPeriod: number
    description: number
    responsibilities: number
    requirements: number
    benefits: number
    applicationDeadline: number
    applicationUrl: number
    postedDate: number
    postedBy: number
    applicantsCount: number
    _all: number
  }


  export type JobAvgAggregateInputType = {
    salaryMin?: true
    salaryMax?: true
    applicantsCount?: true
  }

  export type JobSumAggregateInputType = {
    salaryMin?: true
    salaryMax?: true
    applicantsCount?: true
  }

  export type JobMinAggregateInputType = {
    id?: true
    title?: true
    department?: true
    company?: true
    companyId?: true
    location?: true
    locationType?: true
    employmentType?: true
    experienceLevel?: true
    salaryMin?: true
    salaryMax?: true
    salaryCurrency?: true
    salaryPeriod?: true
    description?: true
    applicationDeadline?: true
    applicationUrl?: true
    postedDate?: true
    postedBy?: true
    applicantsCount?: true
  }

  export type JobMaxAggregateInputType = {
    id?: true
    title?: true
    department?: true
    company?: true
    companyId?: true
    location?: true
    locationType?: true
    employmentType?: true
    experienceLevel?: true
    salaryMin?: true
    salaryMax?: true
    salaryCurrency?: true
    salaryPeriod?: true
    description?: true
    applicationDeadline?: true
    applicationUrl?: true
    postedDate?: true
    postedBy?: true
    applicantsCount?: true
  }

  export type JobCountAggregateInputType = {
    id?: true
    title?: true
    department?: true
    company?: true
    companyId?: true
    location?: true
    locationType?: true
    employmentType?: true
    experienceLevel?: true
    salaryMin?: true
    salaryMax?: true
    salaryCurrency?: true
    salaryPeriod?: true
    description?: true
    responsibilities?: true
    requirements?: true
    benefits?: true
    applicationDeadline?: true
    applicationUrl?: true
    postedDate?: true
    postedBy?: true
    applicantsCount?: true
    _all?: true
  }

  export type JobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Job to aggregate.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Jobs
    **/
    _count?: true | JobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobMaxAggregateInputType
  }

  export type GetJobAggregateType<T extends JobAggregateArgs> = {
        [P in keyof T & keyof AggregateJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJob[P]>
      : GetScalarType<T[P], AggregateJob[P]>
  }




  export type JobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
    orderBy?: JobOrderByWithAggregationInput | JobOrderByWithAggregationInput[]
    by: JobScalarFieldEnum[] | JobScalarFieldEnum
    having?: JobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobCountAggregateInputType | true
    _avg?: JobAvgAggregateInputType
    _sum?: JobSumAggregateInputType
    _min?: JobMinAggregateInputType
    _max?: JobMaxAggregateInputType
  }

  export type JobGroupByOutputType = {
    id: string
    title: string
    department: string | null
    company: string
    companyId: string | null
    location: string
    locationType: string
    employmentType: string
    experienceLevel: string | null
    salaryMin: number | null
    salaryMax: number | null
    salaryCurrency: string | null
    salaryPeriod: string | null
    description: string
    responsibilities: string[]
    requirements: string[]
    benefits: string[]
    applicationDeadline: string | null
    applicationUrl: string | null
    postedDate: Date
    postedBy: string
    applicantsCount: number
    _count: JobCountAggregateOutputType | null
    _avg: JobAvgAggregateOutputType | null
    _sum: JobSumAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  type GetJobGroupByPayload<T extends JobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobGroupByOutputType[P]>
            : GetScalarType<T[P], JobGroupByOutputType[P]>
        }
      >
    >


  export type JobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    department?: boolean
    company?: boolean
    companyId?: boolean
    location?: boolean
    locationType?: boolean
    employmentType?: boolean
    experienceLevel?: boolean
    salaryMin?: boolean
    salaryMax?: boolean
    salaryCurrency?: boolean
    salaryPeriod?: boolean
    description?: boolean
    responsibilities?: boolean
    requirements?: boolean
    benefits?: boolean
    applicationDeadline?: boolean
    applicationUrl?: boolean
    postedDate?: boolean
    postedBy?: boolean
    applicantsCount?: boolean
    recruiter?: boolean | RecruiterDefaultArgs<ExtArgs>
    applications?: boolean | Job$applicationsArgs<ExtArgs>
    _count?: boolean | JobCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>



  export type JobSelectScalar = {
    id?: boolean
    title?: boolean
    department?: boolean
    company?: boolean
    companyId?: boolean
    location?: boolean
    locationType?: boolean
    employmentType?: boolean
    experienceLevel?: boolean
    salaryMin?: boolean
    salaryMax?: boolean
    salaryCurrency?: boolean
    salaryPeriod?: boolean
    description?: boolean
    responsibilities?: boolean
    requirements?: boolean
    benefits?: boolean
    applicationDeadline?: boolean
    applicationUrl?: boolean
    postedDate?: boolean
    postedBy?: boolean
    applicantsCount?: boolean
  }

  export type JobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "department" | "company" | "companyId" | "location" | "locationType" | "employmentType" | "experienceLevel" | "salaryMin" | "salaryMax" | "salaryCurrency" | "salaryPeriod" | "description" | "responsibilities" | "requirements" | "benefits" | "applicationDeadline" | "applicationUrl" | "postedDate" | "postedBy" | "applicantsCount", ExtArgs["result"]["job"]>
  export type JobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recruiter?: boolean | RecruiterDefaultArgs<ExtArgs>
    applications?: boolean | Job$applicationsArgs<ExtArgs>
    _count?: boolean | JobCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $JobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Job"
    objects: {
      recruiter: Prisma.$RecruiterPayload<ExtArgs>
      applications: Prisma.$JobApplicationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      department: string | null
      company: string
      companyId: string | null
      location: string
      locationType: string
      employmentType: string
      experienceLevel: string | null
      salaryMin: number | null
      salaryMax: number | null
      salaryCurrency: string | null
      salaryPeriod: string | null
      description: string
      responsibilities: string[]
      requirements: string[]
      benefits: string[]
      applicationDeadline: string | null
      applicationUrl: string | null
      postedDate: Date
      postedBy: string
      applicantsCount: number
    }, ExtArgs["result"]["job"]>
    composites: {}
  }

  type JobGetPayload<S extends boolean | null | undefined | JobDefaultArgs> = $Result.GetResult<Prisma.$JobPayload, S>

  type JobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobCountAggregateInputType | true
    }

  export interface JobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Job'], meta: { name: 'Job' } }
    /**
     * Find zero or one Job that matches the filter.
     * @param {JobFindUniqueArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobFindUniqueArgs>(args: SelectSubset<T, JobFindUniqueArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Job that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobFindUniqueOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobFindUniqueOrThrowArgs>(args: SelectSubset<T, JobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Job that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindFirstArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobFindFirstArgs>(args?: SelectSubset<T, JobFindFirstArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Job that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindFirstOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobFindFirstOrThrowArgs>(args?: SelectSubset<T, JobFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Jobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Jobs
     * const jobs = await prisma.job.findMany()
     * 
     * // Get first 10 Jobs
     * const jobs = await prisma.job.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobWithIdOnly = await prisma.job.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobFindManyArgs>(args?: SelectSubset<T, JobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Job.
     * @param {JobCreateArgs} args - Arguments to create a Job.
     * @example
     * // Create one Job
     * const Job = await prisma.job.create({
     *   data: {
     *     // ... data to create a Job
     *   }
     * })
     * 
     */
    create<T extends JobCreateArgs>(args: SelectSubset<T, JobCreateArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Jobs.
     * @param {JobCreateManyArgs} args - Arguments to create many Jobs.
     * @example
     * // Create many Jobs
     * const job = await prisma.job.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobCreateManyArgs>(args?: SelectSubset<T, JobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Job.
     * @param {JobDeleteArgs} args - Arguments to delete one Job.
     * @example
     * // Delete one Job
     * const Job = await prisma.job.delete({
     *   where: {
     *     // ... filter to delete one Job
     *   }
     * })
     * 
     */
    delete<T extends JobDeleteArgs>(args: SelectSubset<T, JobDeleteArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Job.
     * @param {JobUpdateArgs} args - Arguments to update one Job.
     * @example
     * // Update one Job
     * const job = await prisma.job.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobUpdateArgs>(args: SelectSubset<T, JobUpdateArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Jobs.
     * @param {JobDeleteManyArgs} args - Arguments to filter Jobs to delete.
     * @example
     * // Delete a few Jobs
     * const { count } = await prisma.job.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobDeleteManyArgs>(args?: SelectSubset<T, JobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Jobs
     * const job = await prisma.job.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobUpdateManyArgs>(args: SelectSubset<T, JobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Job.
     * @param {JobUpsertArgs} args - Arguments to update or create a Job.
     * @example
     * // Update or create a Job
     * const job = await prisma.job.upsert({
     *   create: {
     *     // ... data to create a Job
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Job we want to update
     *   }
     * })
     */
    upsert<T extends JobUpsertArgs>(args: SelectSubset<T, JobUpsertArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Jobs that matches the filter.
     * @param {JobFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const job = await prisma.job.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: JobFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Job.
     * @param {JobAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const job = await prisma.job.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: JobAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobCountArgs} args - Arguments to filter Jobs to count.
     * @example
     * // Count the number of Jobs
     * const count = await prisma.job.count({
     *   where: {
     *     // ... the filter for the Jobs we want to count
     *   }
     * })
    **/
    count<T extends JobCountArgs>(
      args?: Subset<T, JobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends JobAggregateArgs>(args: Subset<T, JobAggregateArgs>): Prisma.PrismaPromise<GetJobAggregateType<T>>

    /**
     * Group by Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobGroupByArgs} args - Group by arguments.
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
      T extends JobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobGroupByArgs['orderBy'] }
        : { orderBy?: JobGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, JobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Job model
   */
  readonly fields: JobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Job.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    recruiter<T extends RecruiterDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RecruiterDefaultArgs<ExtArgs>>): Prisma__RecruiterClient<$Result.GetResult<Prisma.$RecruiterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    applications<T extends Job$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, Job$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Job model
   */
  interface JobFieldRefs {
    readonly id: FieldRef<"Job", 'String'>
    readonly title: FieldRef<"Job", 'String'>
    readonly department: FieldRef<"Job", 'String'>
    readonly company: FieldRef<"Job", 'String'>
    readonly companyId: FieldRef<"Job", 'String'>
    readonly location: FieldRef<"Job", 'String'>
    readonly locationType: FieldRef<"Job", 'String'>
    readonly employmentType: FieldRef<"Job", 'String'>
    readonly experienceLevel: FieldRef<"Job", 'String'>
    readonly salaryMin: FieldRef<"Job", 'Int'>
    readonly salaryMax: FieldRef<"Job", 'Int'>
    readonly salaryCurrency: FieldRef<"Job", 'String'>
    readonly salaryPeriod: FieldRef<"Job", 'String'>
    readonly description: FieldRef<"Job", 'String'>
    readonly responsibilities: FieldRef<"Job", 'String[]'>
    readonly requirements: FieldRef<"Job", 'String[]'>
    readonly benefits: FieldRef<"Job", 'String[]'>
    readonly applicationDeadline: FieldRef<"Job", 'String'>
    readonly applicationUrl: FieldRef<"Job", 'String'>
    readonly postedDate: FieldRef<"Job", 'DateTime'>
    readonly postedBy: FieldRef<"Job", 'String'>
    readonly applicantsCount: FieldRef<"Job", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Job findUnique
   */
  export type JobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job findUniqueOrThrow
   */
  export type JobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job findFirst
   */
  export type JobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job findFirstOrThrow
   */
  export type JobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job findMany
   */
  export type JobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Jobs to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job create
   */
  export type JobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The data needed to create a Job.
     */
    data: XOR<JobCreateInput, JobUncheckedCreateInput>
  }

  /**
   * Job createMany
   */
  export type JobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Jobs.
     */
    data: JobCreateManyInput | JobCreateManyInput[]
  }

  /**
   * Job update
   */
  export type JobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The data needed to update a Job.
     */
    data: XOR<JobUpdateInput, JobUncheckedUpdateInput>
    /**
     * Choose, which Job to update.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job updateMany
   */
  export type JobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Jobs.
     */
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyInput>
    /**
     * Filter which Jobs to update
     */
    where?: JobWhereInput
    /**
     * Limit how many Jobs to update.
     */
    limit?: number
  }

  /**
   * Job upsert
   */
  export type JobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The filter to search for the Job to update in case it exists.
     */
    where: JobWhereUniqueInput
    /**
     * In case the Job found by the `where` argument doesn't exist, create a new Job with this data.
     */
    create: XOR<JobCreateInput, JobUncheckedCreateInput>
    /**
     * In case the Job was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobUpdateInput, JobUncheckedUpdateInput>
  }

  /**
   * Job delete
   */
  export type JobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter which Job to delete.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job deleteMany
   */
  export type JobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Jobs to delete
     */
    where?: JobWhereInput
    /**
     * Limit how many Jobs to delete.
     */
    limit?: number
  }

  /**
   * Job findRaw
   */
  export type JobFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Job aggregateRaw
   */
  export type JobAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Job.applications
   */
  export type Job$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Job without action
   */
  export type JobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
  }


  /**
   * Model JobApplication
   */

  export type AggregateJobApplication = {
    _count: JobApplicationCountAggregateOutputType | null
    _min: JobApplicationMinAggregateOutputType | null
    _max: JobApplicationMaxAggregateOutputType | null
  }

  export type JobApplicationMinAggregateOutputType = {
    id: string | null
    jobId: string | null
    jobSeekerId: string | null
    recruiterId: string | null
    resumeUrl: string | null
    coverLetter: string | null
    expectedSalary: string | null
    noticePeriod: string | null
    availabilityDate: string | null
    status: string | null
    appliedDate: Date | null
    reviewedDate: Date | null
    notes: string | null
    portfolioUrl: string | null
    linkedinUrl: string | null
    githubUrl: string | null
    additionalNotes: string | null
  }

  export type JobApplicationMaxAggregateOutputType = {
    id: string | null
    jobId: string | null
    jobSeekerId: string | null
    recruiterId: string | null
    resumeUrl: string | null
    coverLetter: string | null
    expectedSalary: string | null
    noticePeriod: string | null
    availabilityDate: string | null
    status: string | null
    appliedDate: Date | null
    reviewedDate: Date | null
    notes: string | null
    portfolioUrl: string | null
    linkedinUrl: string | null
    githubUrl: string | null
    additionalNotes: string | null
  }

  export type JobApplicationCountAggregateOutputType = {
    id: number
    jobId: number
    jobSeekerId: number
    recruiterId: number
    resumeUrl: number
    coverLetter: number
    expectedSalary: number
    noticePeriod: number
    availabilityDate: number
    status: number
    appliedDate: number
    reviewedDate: number
    notes: number
    portfolioUrl: number
    linkedinUrl: number
    githubUrl: number
    additionalNotes: number
    _all: number
  }


  export type JobApplicationMinAggregateInputType = {
    id?: true
    jobId?: true
    jobSeekerId?: true
    recruiterId?: true
    resumeUrl?: true
    coverLetter?: true
    expectedSalary?: true
    noticePeriod?: true
    availabilityDate?: true
    status?: true
    appliedDate?: true
    reviewedDate?: true
    notes?: true
    portfolioUrl?: true
    linkedinUrl?: true
    githubUrl?: true
    additionalNotes?: true
  }

  export type JobApplicationMaxAggregateInputType = {
    id?: true
    jobId?: true
    jobSeekerId?: true
    recruiterId?: true
    resumeUrl?: true
    coverLetter?: true
    expectedSalary?: true
    noticePeriod?: true
    availabilityDate?: true
    status?: true
    appliedDate?: true
    reviewedDate?: true
    notes?: true
    portfolioUrl?: true
    linkedinUrl?: true
    githubUrl?: true
    additionalNotes?: true
  }

  export type JobApplicationCountAggregateInputType = {
    id?: true
    jobId?: true
    jobSeekerId?: true
    recruiterId?: true
    resumeUrl?: true
    coverLetter?: true
    expectedSalary?: true
    noticePeriod?: true
    availabilityDate?: true
    status?: true
    appliedDate?: true
    reviewedDate?: true
    notes?: true
    portfolioUrl?: true
    linkedinUrl?: true
    githubUrl?: true
    additionalNotes?: true
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
    _min?: JobApplicationMinAggregateInputType
    _max?: JobApplicationMaxAggregateInputType
  }

  export type JobApplicationGroupByOutputType = {
    id: string
    jobId: string
    jobSeekerId: string
    recruiterId: string
    resumeUrl: string | null
    coverLetter: string | null
    expectedSalary: string | null
    noticePeriod: string | null
    availabilityDate: string | null
    status: string
    appliedDate: Date
    reviewedDate: Date | null
    notes: string | null
    portfolioUrl: string | null
    linkedinUrl: string | null
    githubUrl: string | null
    additionalNotes: string | null
    _count: JobApplicationCountAggregateOutputType | null
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
    jobId?: boolean
    jobSeekerId?: boolean
    recruiterId?: boolean
    resumeUrl?: boolean
    coverLetter?: boolean
    expectedSalary?: boolean
    noticePeriod?: boolean
    availabilityDate?: boolean
    status?: boolean
    appliedDate?: boolean
    reviewedDate?: boolean
    notes?: boolean
    portfolioUrl?: boolean
    linkedinUrl?: boolean
    githubUrl?: boolean
    additionalNotes?: boolean
    job?: boolean | JobDefaultArgs<ExtArgs>
    jobSeeker?: boolean | JobSeekerDefaultArgs<ExtArgs>
    recruiter?: boolean | RecruiterDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jobApplication"]>



  export type JobApplicationSelectScalar = {
    id?: boolean
    jobId?: boolean
    jobSeekerId?: boolean
    recruiterId?: boolean
    resumeUrl?: boolean
    coverLetter?: boolean
    expectedSalary?: boolean
    noticePeriod?: boolean
    availabilityDate?: boolean
    status?: boolean
    appliedDate?: boolean
    reviewedDate?: boolean
    notes?: boolean
    portfolioUrl?: boolean
    linkedinUrl?: boolean
    githubUrl?: boolean
    additionalNotes?: boolean
  }

  export type JobApplicationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "jobId" | "jobSeekerId" | "recruiterId" | "resumeUrl" | "coverLetter" | "expectedSalary" | "noticePeriod" | "availabilityDate" | "status" | "appliedDate" | "reviewedDate" | "notes" | "portfolioUrl" | "linkedinUrl" | "githubUrl" | "additionalNotes", ExtArgs["result"]["jobApplication"]>
  export type JobApplicationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    job?: boolean | JobDefaultArgs<ExtArgs>
    jobSeeker?: boolean | JobSeekerDefaultArgs<ExtArgs>
    recruiter?: boolean | RecruiterDefaultArgs<ExtArgs>
  }

  export type $JobApplicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JobApplication"
    objects: {
      job: Prisma.$JobPayload<ExtArgs>
      jobSeeker: Prisma.$JobSeekerPayload<ExtArgs>
      recruiter: Prisma.$RecruiterPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      jobId: string
      jobSeekerId: string
      recruiterId: string
      resumeUrl: string | null
      coverLetter: string | null
      expectedSalary: string | null
      noticePeriod: string | null
      availabilityDate: string | null
      status: string
      appliedDate: Date
      reviewedDate: Date | null
      notes: string | null
      portfolioUrl: string | null
      linkedinUrl: string | null
      githubUrl: string | null
      additionalNotes: string | null
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
     * Find zero or more JobApplications that matches the filter.
     * @param {JobApplicationFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const jobApplication = await prisma.jobApplication.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: JobApplicationFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a JobApplication.
     * @param {JobApplicationAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const jobApplication = await prisma.jobApplication.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: JobApplicationAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


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
    job<T extends JobDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JobDefaultArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    jobSeeker<T extends JobSeekerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JobSeekerDefaultArgs<ExtArgs>>): Prisma__JobSeekerClient<$Result.GetResult<Prisma.$JobSeekerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    recruiter<T extends RecruiterDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RecruiterDefaultArgs<ExtArgs>>): Prisma__RecruiterClient<$Result.GetResult<Prisma.$RecruiterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
    readonly id: FieldRef<"JobApplication", 'String'>
    readonly jobId: FieldRef<"JobApplication", 'String'>
    readonly jobSeekerId: FieldRef<"JobApplication", 'String'>
    readonly recruiterId: FieldRef<"JobApplication", 'String'>
    readonly resumeUrl: FieldRef<"JobApplication", 'String'>
    readonly coverLetter: FieldRef<"JobApplication", 'String'>
    readonly expectedSalary: FieldRef<"JobApplication", 'String'>
    readonly noticePeriod: FieldRef<"JobApplication", 'String'>
    readonly availabilityDate: FieldRef<"JobApplication", 'String'>
    readonly status: FieldRef<"JobApplication", 'String'>
    readonly appliedDate: FieldRef<"JobApplication", 'DateTime'>
    readonly reviewedDate: FieldRef<"JobApplication", 'DateTime'>
    readonly notes: FieldRef<"JobApplication", 'String'>
    readonly portfolioUrl: FieldRef<"JobApplication", 'String'>
    readonly linkedinUrl: FieldRef<"JobApplication", 'String'>
    readonly githubUrl: FieldRef<"JobApplication", 'String'>
    readonly additionalNotes: FieldRef<"JobApplication", 'String'>
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
   * JobApplication findRaw
   */
  export type JobApplicationFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * JobApplication aggregateRaw
   */
  export type JobApplicationAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
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
   * Model Resume
   */

  export type AggregateResume = {
    _count: ResumeCountAggregateOutputType | null
    _avg: ResumeAvgAggregateOutputType | null
    _sum: ResumeSumAggregateOutputType | null
    _min: ResumeMinAggregateOutputType | null
    _max: ResumeMaxAggregateOutputType | null
  }

  export type ResumeAvgAggregateOutputType = {
    jobApplications: number | null
  }

  export type ResumeSumAggregateOutputType = {
    jobApplications: number | null
  }

  export type ResumeMinAggregateOutputType = {
    id: string | null
    jobSeekerId: string | null
    name: string | null
    template: string | null
    lastModified: Date | null
    jobApplications: number | null
    isActive: boolean | null
  }

  export type ResumeMaxAggregateOutputType = {
    id: string | null
    jobSeekerId: string | null
    name: string | null
    template: string | null
    lastModified: Date | null
    jobApplications: number | null
    isActive: boolean | null
  }

  export type ResumeCountAggregateOutputType = {
    id: number
    jobSeekerId: number
    name: number
    template: number
    data: number
    lastModified: number
    jobApplications: number
    isActive: number
    _all: number
  }


  export type ResumeAvgAggregateInputType = {
    jobApplications?: true
  }

  export type ResumeSumAggregateInputType = {
    jobApplications?: true
  }

  export type ResumeMinAggregateInputType = {
    id?: true
    jobSeekerId?: true
    name?: true
    template?: true
    lastModified?: true
    jobApplications?: true
    isActive?: true
  }

  export type ResumeMaxAggregateInputType = {
    id?: true
    jobSeekerId?: true
    name?: true
    template?: true
    lastModified?: true
    jobApplications?: true
    isActive?: true
  }

  export type ResumeCountAggregateInputType = {
    id?: true
    jobSeekerId?: true
    name?: true
    template?: true
    data?: true
    lastModified?: true
    jobApplications?: true
    isActive?: true
    _all?: true
  }

  export type ResumeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resume to aggregate.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Resumes
    **/
    _count?: true | ResumeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResumeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResumeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResumeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResumeMaxAggregateInputType
  }

  export type GetResumeAggregateType<T extends ResumeAggregateArgs> = {
        [P in keyof T & keyof AggregateResume]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResume[P]>
      : GetScalarType<T[P], AggregateResume[P]>
  }




  export type ResumeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResumeWhereInput
    orderBy?: ResumeOrderByWithAggregationInput | ResumeOrderByWithAggregationInput[]
    by: ResumeScalarFieldEnum[] | ResumeScalarFieldEnum
    having?: ResumeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResumeCountAggregateInputType | true
    _avg?: ResumeAvgAggregateInputType
    _sum?: ResumeSumAggregateInputType
    _min?: ResumeMinAggregateInputType
    _max?: ResumeMaxAggregateInputType
  }

  export type ResumeGroupByOutputType = {
    id: string
    jobSeekerId: string
    name: string
    template: string
    data: JsonValue
    lastModified: Date
    jobApplications: number
    isActive: boolean
    _count: ResumeCountAggregateOutputType | null
    _avg: ResumeAvgAggregateOutputType | null
    _sum: ResumeSumAggregateOutputType | null
    _min: ResumeMinAggregateOutputType | null
    _max: ResumeMaxAggregateOutputType | null
  }

  type GetResumeGroupByPayload<T extends ResumeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResumeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResumeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResumeGroupByOutputType[P]>
            : GetScalarType<T[P], ResumeGroupByOutputType[P]>
        }
      >
    >


  export type ResumeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jobSeekerId?: boolean
    name?: boolean
    template?: boolean
    data?: boolean
    lastModified?: boolean
    jobApplications?: boolean
    isActive?: boolean
    jobSeeker?: boolean | JobSeekerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resume"]>



  export type ResumeSelectScalar = {
    id?: boolean
    jobSeekerId?: boolean
    name?: boolean
    template?: boolean
    data?: boolean
    lastModified?: boolean
    jobApplications?: boolean
    isActive?: boolean
  }

  export type ResumeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "jobSeekerId" | "name" | "template" | "data" | "lastModified" | "jobApplications" | "isActive", ExtArgs["result"]["resume"]>
  export type ResumeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobSeeker?: boolean | JobSeekerDefaultArgs<ExtArgs>
  }

  export type $ResumePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Resume"
    objects: {
      jobSeeker: Prisma.$JobSeekerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      jobSeekerId: string
      name: string
      template: string
      data: Prisma.JsonValue
      lastModified: Date
      jobApplications: number
      isActive: boolean
    }, ExtArgs["result"]["resume"]>
    composites: {}
  }

  type ResumeGetPayload<S extends boolean | null | undefined | ResumeDefaultArgs> = $Result.GetResult<Prisma.$ResumePayload, S>

  type ResumeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResumeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResumeCountAggregateInputType | true
    }

  export interface ResumeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Resume'], meta: { name: 'Resume' } }
    /**
     * Find zero or one Resume that matches the filter.
     * @param {ResumeFindUniqueArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResumeFindUniqueArgs>(args: SelectSubset<T, ResumeFindUniqueArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Resume that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResumeFindUniqueOrThrowArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResumeFindUniqueOrThrowArgs>(args: SelectSubset<T, ResumeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Resume that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindFirstArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResumeFindFirstArgs>(args?: SelectSubset<T, ResumeFindFirstArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Resume that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindFirstOrThrowArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResumeFindFirstOrThrowArgs>(args?: SelectSubset<T, ResumeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Resumes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Resumes
     * const resumes = await prisma.resume.findMany()
     * 
     * // Get first 10 Resumes
     * const resumes = await prisma.resume.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resumeWithIdOnly = await prisma.resume.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResumeFindManyArgs>(args?: SelectSubset<T, ResumeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Resume.
     * @param {ResumeCreateArgs} args - Arguments to create a Resume.
     * @example
     * // Create one Resume
     * const Resume = await prisma.resume.create({
     *   data: {
     *     // ... data to create a Resume
     *   }
     * })
     * 
     */
    create<T extends ResumeCreateArgs>(args: SelectSubset<T, ResumeCreateArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Resumes.
     * @param {ResumeCreateManyArgs} args - Arguments to create many Resumes.
     * @example
     * // Create many Resumes
     * const resume = await prisma.resume.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResumeCreateManyArgs>(args?: SelectSubset<T, ResumeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Resume.
     * @param {ResumeDeleteArgs} args - Arguments to delete one Resume.
     * @example
     * // Delete one Resume
     * const Resume = await prisma.resume.delete({
     *   where: {
     *     // ... filter to delete one Resume
     *   }
     * })
     * 
     */
    delete<T extends ResumeDeleteArgs>(args: SelectSubset<T, ResumeDeleteArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Resume.
     * @param {ResumeUpdateArgs} args - Arguments to update one Resume.
     * @example
     * // Update one Resume
     * const resume = await prisma.resume.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResumeUpdateArgs>(args: SelectSubset<T, ResumeUpdateArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Resumes.
     * @param {ResumeDeleteManyArgs} args - Arguments to filter Resumes to delete.
     * @example
     * // Delete a few Resumes
     * const { count } = await prisma.resume.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResumeDeleteManyArgs>(args?: SelectSubset<T, ResumeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Resumes
     * const resume = await prisma.resume.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResumeUpdateManyArgs>(args: SelectSubset<T, ResumeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Resume.
     * @param {ResumeUpsertArgs} args - Arguments to update or create a Resume.
     * @example
     * // Update or create a Resume
     * const resume = await prisma.resume.upsert({
     *   create: {
     *     // ... data to create a Resume
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Resume we want to update
     *   }
     * })
     */
    upsert<T extends ResumeUpsertArgs>(args: SelectSubset<T, ResumeUpsertArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Resumes that matches the filter.
     * @param {ResumeFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const resume = await prisma.resume.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ResumeFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Resume.
     * @param {ResumeAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const resume = await prisma.resume.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ResumeAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Resumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeCountArgs} args - Arguments to filter Resumes to count.
     * @example
     * // Count the number of Resumes
     * const count = await prisma.resume.count({
     *   where: {
     *     // ... the filter for the Resumes we want to count
     *   }
     * })
    **/
    count<T extends ResumeCountArgs>(
      args?: Subset<T, ResumeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResumeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Resume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ResumeAggregateArgs>(args: Subset<T, ResumeAggregateArgs>): Prisma.PrismaPromise<GetResumeAggregateType<T>>

    /**
     * Group by Resume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeGroupByArgs} args - Group by arguments.
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
      T extends ResumeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResumeGroupByArgs['orderBy'] }
        : { orderBy?: ResumeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ResumeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResumeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Resume model
   */
  readonly fields: ResumeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Resume.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResumeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    jobSeeker<T extends JobSeekerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JobSeekerDefaultArgs<ExtArgs>>): Prisma__JobSeekerClient<$Result.GetResult<Prisma.$JobSeekerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Resume model
   */
  interface ResumeFieldRefs {
    readonly id: FieldRef<"Resume", 'String'>
    readonly jobSeekerId: FieldRef<"Resume", 'String'>
    readonly name: FieldRef<"Resume", 'String'>
    readonly template: FieldRef<"Resume", 'String'>
    readonly data: FieldRef<"Resume", 'Json'>
    readonly lastModified: FieldRef<"Resume", 'DateTime'>
    readonly jobApplications: FieldRef<"Resume", 'Int'>
    readonly isActive: FieldRef<"Resume", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Resume findUnique
   */
  export type ResumeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume findUniqueOrThrow
   */
  export type ResumeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume findFirst
   */
  export type ResumeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resumes.
     */
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume findFirstOrThrow
   */
  export type ResumeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resumes.
     */
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume findMany
   */
  export type ResumeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resumes to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume create
   */
  export type ResumeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The data needed to create a Resume.
     */
    data: XOR<ResumeCreateInput, ResumeUncheckedCreateInput>
  }

  /**
   * Resume createMany
   */
  export type ResumeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Resumes.
     */
    data: ResumeCreateManyInput | ResumeCreateManyInput[]
  }

  /**
   * Resume update
   */
  export type ResumeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The data needed to update a Resume.
     */
    data: XOR<ResumeUpdateInput, ResumeUncheckedUpdateInput>
    /**
     * Choose, which Resume to update.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume updateMany
   */
  export type ResumeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Resumes.
     */
    data: XOR<ResumeUpdateManyMutationInput, ResumeUncheckedUpdateManyInput>
    /**
     * Filter which Resumes to update
     */
    where?: ResumeWhereInput
    /**
     * Limit how many Resumes to update.
     */
    limit?: number
  }

  /**
   * Resume upsert
   */
  export type ResumeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The filter to search for the Resume to update in case it exists.
     */
    where: ResumeWhereUniqueInput
    /**
     * In case the Resume found by the `where` argument doesn't exist, create a new Resume with this data.
     */
    create: XOR<ResumeCreateInput, ResumeUncheckedCreateInput>
    /**
     * In case the Resume was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResumeUpdateInput, ResumeUncheckedUpdateInput>
  }

  /**
   * Resume delete
   */
  export type ResumeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter which Resume to delete.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume deleteMany
   */
  export type ResumeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resumes to delete
     */
    where?: ResumeWhereInput
    /**
     * Limit how many Resumes to delete.
     */
    limit?: number
  }

  /**
   * Resume findRaw
   */
  export type ResumeFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Resume aggregateRaw
   */
  export type ResumeAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Resume without action
   */
  export type ResumeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const JobSeekerScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    fullName: 'fullName',
    phone: 'phone',
    currentJobTitle: 'currentJobTitle',
    yearsOfExperience: 'yearsOfExperience',
    education: 'education',
    skills: 'skills',
    resume: 'resume',
    city: 'city',
    state: 'state',
    country: 'country',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isActive: 'isActive',
    lastLogin: 'lastLogin',
    profileComplete: 'profileComplete',
    emailVerified: 'emailVerified',
    phoneVerified: 'phoneVerified',
    bio: 'bio',
    linkedinUrl: 'linkedinUrl',
    githubUrl: 'githubUrl',
    portfolioUrl: 'portfolioUrl',
    preferredJobTypes: 'preferredJobTypes',
    expectedSalary: 'expectedSalary',
    noticePeriod: 'noticePeriod',
    languages: 'languages',
    certifications: 'certifications'
  };

  export type JobSeekerScalarFieldEnum = (typeof JobSeekerScalarFieldEnum)[keyof typeof JobSeekerScalarFieldEnum]


  export const RecruiterScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    companyName: 'companyName',
    fullName: 'fullName',
    phone: 'phone',
    position: 'position',
    companySize: 'companySize',
    industry: 'industry',
    website: 'website',
    city: 'city',
    state: 'state',
    country: 'country',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isActive: 'isActive',
    lastLogin: 'lastLogin',
    profileComplete: 'profileComplete',
    emailVerified: 'emailVerified',
    phoneVerified: 'phoneVerified',
    bio: 'bio',
    linkedinUrl: 'linkedinUrl',
    companyDescription: 'companyDescription',
    companyLogo: 'companyLogo',
    companyBenefits: 'companyBenefits',
    hiringNeeds: 'hiringNeeds',
    preferredLocations: 'preferredLocations'
  };

  export type RecruiterScalarFieldEnum = (typeof RecruiterScalarFieldEnum)[keyof typeof RecruiterScalarFieldEnum]


  export const JobScalarFieldEnum: {
    id: 'id',
    title: 'title',
    department: 'department',
    company: 'company',
    companyId: 'companyId',
    location: 'location',
    locationType: 'locationType',
    employmentType: 'employmentType',
    experienceLevel: 'experienceLevel',
    salaryMin: 'salaryMin',
    salaryMax: 'salaryMax',
    salaryCurrency: 'salaryCurrency',
    salaryPeriod: 'salaryPeriod',
    description: 'description',
    responsibilities: 'responsibilities',
    requirements: 'requirements',
    benefits: 'benefits',
    applicationDeadline: 'applicationDeadline',
    applicationUrl: 'applicationUrl',
    postedDate: 'postedDate',
    postedBy: 'postedBy',
    applicantsCount: 'applicantsCount'
  };

  export type JobScalarFieldEnum = (typeof JobScalarFieldEnum)[keyof typeof JobScalarFieldEnum]


  export const JobApplicationScalarFieldEnum: {
    id: 'id',
    jobId: 'jobId',
    jobSeekerId: 'jobSeekerId',
    recruiterId: 'recruiterId',
    resumeUrl: 'resumeUrl',
    coverLetter: 'coverLetter',
    expectedSalary: 'expectedSalary',
    noticePeriod: 'noticePeriod',
    availabilityDate: 'availabilityDate',
    status: 'status',
    appliedDate: 'appliedDate',
    reviewedDate: 'reviewedDate',
    notes: 'notes',
    portfolioUrl: 'portfolioUrl',
    linkedinUrl: 'linkedinUrl',
    githubUrl: 'githubUrl',
    additionalNotes: 'additionalNotes'
  };

  export type JobApplicationScalarFieldEnum = (typeof JobApplicationScalarFieldEnum)[keyof typeof JobApplicationScalarFieldEnum]


  export const ResumeScalarFieldEnum: {
    id: 'id',
    jobSeekerId: 'jobSeekerId',
    name: 'name',
    template: 'template',
    data: 'data',
    lastModified: 'lastModified',
    jobApplications: 'jobApplications',
    isActive: 'isActive'
  };

  export type ResumeScalarFieldEnum = (typeof ResumeScalarFieldEnum)[keyof typeof ResumeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type JobSeekerWhereInput = {
    AND?: JobSeekerWhereInput | JobSeekerWhereInput[]
    OR?: JobSeekerWhereInput[]
    NOT?: JobSeekerWhereInput | JobSeekerWhereInput[]
    id?: StringFilter<"JobSeeker"> | string
    email?: StringFilter<"JobSeeker"> | string
    password?: StringNullableFilter<"JobSeeker"> | string | null
    fullName?: StringFilter<"JobSeeker"> | string
    phone?: StringNullableFilter<"JobSeeker"> | string | null
    currentJobTitle?: StringNullableFilter<"JobSeeker"> | string | null
    yearsOfExperience?: StringNullableFilter<"JobSeeker"> | string | null
    education?: StringNullableFilter<"JobSeeker"> | string | null
    skills?: StringNullableListFilter<"JobSeeker">
    resume?: StringNullableFilter<"JobSeeker"> | string | null
    city?: StringNullableFilter<"JobSeeker"> | string | null
    state?: StringNullableFilter<"JobSeeker"> | string | null
    country?: StringNullableFilter<"JobSeeker"> | string | null
    createdAt?: DateTimeFilter<"JobSeeker"> | Date | string
    updatedAt?: DateTimeFilter<"JobSeeker"> | Date | string
    isActive?: BoolFilter<"JobSeeker"> | boolean
    lastLogin?: DateTimeNullableFilter<"JobSeeker"> | Date | string | null
    profileComplete?: BoolFilter<"JobSeeker"> | boolean
    emailVerified?: BoolFilter<"JobSeeker"> | boolean
    phoneVerified?: BoolFilter<"JobSeeker"> | boolean
    bio?: StringNullableFilter<"JobSeeker"> | string | null
    linkedinUrl?: StringNullableFilter<"JobSeeker"> | string | null
    githubUrl?: StringNullableFilter<"JobSeeker"> | string | null
    portfolioUrl?: StringNullableFilter<"JobSeeker"> | string | null
    preferredJobTypes?: StringNullableListFilter<"JobSeeker">
    expectedSalary?: StringNullableFilter<"JobSeeker"> | string | null
    noticePeriod?: StringNullableFilter<"JobSeeker"> | string | null
    languages?: StringNullableListFilter<"JobSeeker">
    certifications?: StringNullableListFilter<"JobSeeker">
    applications?: JobApplicationListRelationFilter
    resumes?: ResumeListRelationFilter
  }

  export type JobSeekerOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    currentJobTitle?: SortOrder
    yearsOfExperience?: SortOrder
    education?: SortOrder
    skills?: SortOrder
    resume?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    profileComplete?: SortOrder
    emailVerified?: SortOrder
    phoneVerified?: SortOrder
    bio?: SortOrder
    linkedinUrl?: SortOrder
    githubUrl?: SortOrder
    portfolioUrl?: SortOrder
    preferredJobTypes?: SortOrder
    expectedSalary?: SortOrder
    noticePeriod?: SortOrder
    languages?: SortOrder
    certifications?: SortOrder
    applications?: JobApplicationOrderByRelationAggregateInput
    resumes?: ResumeOrderByRelationAggregateInput
  }

  export type JobSeekerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: JobSeekerWhereInput | JobSeekerWhereInput[]
    OR?: JobSeekerWhereInput[]
    NOT?: JobSeekerWhereInput | JobSeekerWhereInput[]
    password?: StringNullableFilter<"JobSeeker"> | string | null
    fullName?: StringFilter<"JobSeeker"> | string
    phone?: StringNullableFilter<"JobSeeker"> | string | null
    currentJobTitle?: StringNullableFilter<"JobSeeker"> | string | null
    yearsOfExperience?: StringNullableFilter<"JobSeeker"> | string | null
    education?: StringNullableFilter<"JobSeeker"> | string | null
    skills?: StringNullableListFilter<"JobSeeker">
    resume?: StringNullableFilter<"JobSeeker"> | string | null
    city?: StringNullableFilter<"JobSeeker"> | string | null
    state?: StringNullableFilter<"JobSeeker"> | string | null
    country?: StringNullableFilter<"JobSeeker"> | string | null
    createdAt?: DateTimeFilter<"JobSeeker"> | Date | string
    updatedAt?: DateTimeFilter<"JobSeeker"> | Date | string
    isActive?: BoolFilter<"JobSeeker"> | boolean
    lastLogin?: DateTimeNullableFilter<"JobSeeker"> | Date | string | null
    profileComplete?: BoolFilter<"JobSeeker"> | boolean
    emailVerified?: BoolFilter<"JobSeeker"> | boolean
    phoneVerified?: BoolFilter<"JobSeeker"> | boolean
    bio?: StringNullableFilter<"JobSeeker"> | string | null
    linkedinUrl?: StringNullableFilter<"JobSeeker"> | string | null
    githubUrl?: StringNullableFilter<"JobSeeker"> | string | null
    portfolioUrl?: StringNullableFilter<"JobSeeker"> | string | null
    preferredJobTypes?: StringNullableListFilter<"JobSeeker">
    expectedSalary?: StringNullableFilter<"JobSeeker"> | string | null
    noticePeriod?: StringNullableFilter<"JobSeeker"> | string | null
    languages?: StringNullableListFilter<"JobSeeker">
    certifications?: StringNullableListFilter<"JobSeeker">
    applications?: JobApplicationListRelationFilter
    resumes?: ResumeListRelationFilter
  }, "id" | "email">

  export type JobSeekerOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    currentJobTitle?: SortOrder
    yearsOfExperience?: SortOrder
    education?: SortOrder
    skills?: SortOrder
    resume?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    profileComplete?: SortOrder
    emailVerified?: SortOrder
    phoneVerified?: SortOrder
    bio?: SortOrder
    linkedinUrl?: SortOrder
    githubUrl?: SortOrder
    portfolioUrl?: SortOrder
    preferredJobTypes?: SortOrder
    expectedSalary?: SortOrder
    noticePeriod?: SortOrder
    languages?: SortOrder
    certifications?: SortOrder
    _count?: JobSeekerCountOrderByAggregateInput
    _max?: JobSeekerMaxOrderByAggregateInput
    _min?: JobSeekerMinOrderByAggregateInput
  }

  export type JobSeekerScalarWhereWithAggregatesInput = {
    AND?: JobSeekerScalarWhereWithAggregatesInput | JobSeekerScalarWhereWithAggregatesInput[]
    OR?: JobSeekerScalarWhereWithAggregatesInput[]
    NOT?: JobSeekerScalarWhereWithAggregatesInput | JobSeekerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JobSeeker"> | string
    email?: StringWithAggregatesFilter<"JobSeeker"> | string
    password?: StringNullableWithAggregatesFilter<"JobSeeker"> | string | null
    fullName?: StringWithAggregatesFilter<"JobSeeker"> | string
    phone?: StringNullableWithAggregatesFilter<"JobSeeker"> | string | null
    currentJobTitle?: StringNullableWithAggregatesFilter<"JobSeeker"> | string | null
    yearsOfExperience?: StringNullableWithAggregatesFilter<"JobSeeker"> | string | null
    education?: StringNullableWithAggregatesFilter<"JobSeeker"> | string | null
    skills?: StringNullableListFilter<"JobSeeker">
    resume?: StringNullableWithAggregatesFilter<"JobSeeker"> | string | null
    city?: StringNullableWithAggregatesFilter<"JobSeeker"> | string | null
    state?: StringNullableWithAggregatesFilter<"JobSeeker"> | string | null
    country?: StringNullableWithAggregatesFilter<"JobSeeker"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"JobSeeker"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"JobSeeker"> | Date | string
    isActive?: BoolWithAggregatesFilter<"JobSeeker"> | boolean
    lastLogin?: DateTimeNullableWithAggregatesFilter<"JobSeeker"> | Date | string | null
    profileComplete?: BoolWithAggregatesFilter<"JobSeeker"> | boolean
    emailVerified?: BoolWithAggregatesFilter<"JobSeeker"> | boolean
    phoneVerified?: BoolWithAggregatesFilter<"JobSeeker"> | boolean
    bio?: StringNullableWithAggregatesFilter<"JobSeeker"> | string | null
    linkedinUrl?: StringNullableWithAggregatesFilter<"JobSeeker"> | string | null
    githubUrl?: StringNullableWithAggregatesFilter<"JobSeeker"> | string | null
    portfolioUrl?: StringNullableWithAggregatesFilter<"JobSeeker"> | string | null
    preferredJobTypes?: StringNullableListFilter<"JobSeeker">
    expectedSalary?: StringNullableWithAggregatesFilter<"JobSeeker"> | string | null
    noticePeriod?: StringNullableWithAggregatesFilter<"JobSeeker"> | string | null
    languages?: StringNullableListFilter<"JobSeeker">
    certifications?: StringNullableListFilter<"JobSeeker">
  }

  export type RecruiterWhereInput = {
    AND?: RecruiterWhereInput | RecruiterWhereInput[]
    OR?: RecruiterWhereInput[]
    NOT?: RecruiterWhereInput | RecruiterWhereInput[]
    id?: StringFilter<"Recruiter"> | string
    email?: StringFilter<"Recruiter"> | string
    password?: StringNullableFilter<"Recruiter"> | string | null
    companyName?: StringFilter<"Recruiter"> | string
    fullName?: StringFilter<"Recruiter"> | string
    phone?: StringNullableFilter<"Recruiter"> | string | null
    position?: StringNullableFilter<"Recruiter"> | string | null
    companySize?: StringNullableFilter<"Recruiter"> | string | null
    industry?: StringNullableFilter<"Recruiter"> | string | null
    website?: StringNullableFilter<"Recruiter"> | string | null
    city?: StringNullableFilter<"Recruiter"> | string | null
    state?: StringNullableFilter<"Recruiter"> | string | null
    country?: StringNullableFilter<"Recruiter"> | string | null
    createdAt?: DateTimeFilter<"Recruiter"> | Date | string
    updatedAt?: DateTimeFilter<"Recruiter"> | Date | string
    isActive?: BoolFilter<"Recruiter"> | boolean
    lastLogin?: DateTimeNullableFilter<"Recruiter"> | Date | string | null
    profileComplete?: BoolFilter<"Recruiter"> | boolean
    emailVerified?: BoolFilter<"Recruiter"> | boolean
    phoneVerified?: BoolFilter<"Recruiter"> | boolean
    bio?: StringNullableFilter<"Recruiter"> | string | null
    linkedinUrl?: StringNullableFilter<"Recruiter"> | string | null
    companyDescription?: StringNullableFilter<"Recruiter"> | string | null
    companyLogo?: StringNullableFilter<"Recruiter"> | string | null
    companyBenefits?: StringNullableListFilter<"Recruiter">
    hiringNeeds?: StringNullableListFilter<"Recruiter">
    preferredLocations?: StringNullableListFilter<"Recruiter">
    jobs?: JobListRelationFilter
    applications?: JobApplicationListRelationFilter
  }

  export type RecruiterOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    companyName?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    position?: SortOrder
    companySize?: SortOrder
    industry?: SortOrder
    website?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    profileComplete?: SortOrder
    emailVerified?: SortOrder
    phoneVerified?: SortOrder
    bio?: SortOrder
    linkedinUrl?: SortOrder
    companyDescription?: SortOrder
    companyLogo?: SortOrder
    companyBenefits?: SortOrder
    hiringNeeds?: SortOrder
    preferredLocations?: SortOrder
    jobs?: JobOrderByRelationAggregateInput
    applications?: JobApplicationOrderByRelationAggregateInput
  }

  export type RecruiterWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: RecruiterWhereInput | RecruiterWhereInput[]
    OR?: RecruiterWhereInput[]
    NOT?: RecruiterWhereInput | RecruiterWhereInput[]
    password?: StringNullableFilter<"Recruiter"> | string | null
    companyName?: StringFilter<"Recruiter"> | string
    fullName?: StringFilter<"Recruiter"> | string
    phone?: StringNullableFilter<"Recruiter"> | string | null
    position?: StringNullableFilter<"Recruiter"> | string | null
    companySize?: StringNullableFilter<"Recruiter"> | string | null
    industry?: StringNullableFilter<"Recruiter"> | string | null
    website?: StringNullableFilter<"Recruiter"> | string | null
    city?: StringNullableFilter<"Recruiter"> | string | null
    state?: StringNullableFilter<"Recruiter"> | string | null
    country?: StringNullableFilter<"Recruiter"> | string | null
    createdAt?: DateTimeFilter<"Recruiter"> | Date | string
    updatedAt?: DateTimeFilter<"Recruiter"> | Date | string
    isActive?: BoolFilter<"Recruiter"> | boolean
    lastLogin?: DateTimeNullableFilter<"Recruiter"> | Date | string | null
    profileComplete?: BoolFilter<"Recruiter"> | boolean
    emailVerified?: BoolFilter<"Recruiter"> | boolean
    phoneVerified?: BoolFilter<"Recruiter"> | boolean
    bio?: StringNullableFilter<"Recruiter"> | string | null
    linkedinUrl?: StringNullableFilter<"Recruiter"> | string | null
    companyDescription?: StringNullableFilter<"Recruiter"> | string | null
    companyLogo?: StringNullableFilter<"Recruiter"> | string | null
    companyBenefits?: StringNullableListFilter<"Recruiter">
    hiringNeeds?: StringNullableListFilter<"Recruiter">
    preferredLocations?: StringNullableListFilter<"Recruiter">
    jobs?: JobListRelationFilter
    applications?: JobApplicationListRelationFilter
  }, "id" | "email">

  export type RecruiterOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    companyName?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    position?: SortOrder
    companySize?: SortOrder
    industry?: SortOrder
    website?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    profileComplete?: SortOrder
    emailVerified?: SortOrder
    phoneVerified?: SortOrder
    bio?: SortOrder
    linkedinUrl?: SortOrder
    companyDescription?: SortOrder
    companyLogo?: SortOrder
    companyBenefits?: SortOrder
    hiringNeeds?: SortOrder
    preferredLocations?: SortOrder
    _count?: RecruiterCountOrderByAggregateInput
    _max?: RecruiterMaxOrderByAggregateInput
    _min?: RecruiterMinOrderByAggregateInput
  }

  export type RecruiterScalarWhereWithAggregatesInput = {
    AND?: RecruiterScalarWhereWithAggregatesInput | RecruiterScalarWhereWithAggregatesInput[]
    OR?: RecruiterScalarWhereWithAggregatesInput[]
    NOT?: RecruiterScalarWhereWithAggregatesInput | RecruiterScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Recruiter"> | string
    email?: StringWithAggregatesFilter<"Recruiter"> | string
    password?: StringNullableWithAggregatesFilter<"Recruiter"> | string | null
    companyName?: StringWithAggregatesFilter<"Recruiter"> | string
    fullName?: StringWithAggregatesFilter<"Recruiter"> | string
    phone?: StringNullableWithAggregatesFilter<"Recruiter"> | string | null
    position?: StringNullableWithAggregatesFilter<"Recruiter"> | string | null
    companySize?: StringNullableWithAggregatesFilter<"Recruiter"> | string | null
    industry?: StringNullableWithAggregatesFilter<"Recruiter"> | string | null
    website?: StringNullableWithAggregatesFilter<"Recruiter"> | string | null
    city?: StringNullableWithAggregatesFilter<"Recruiter"> | string | null
    state?: StringNullableWithAggregatesFilter<"Recruiter"> | string | null
    country?: StringNullableWithAggregatesFilter<"Recruiter"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Recruiter"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Recruiter"> | Date | string
    isActive?: BoolWithAggregatesFilter<"Recruiter"> | boolean
    lastLogin?: DateTimeNullableWithAggregatesFilter<"Recruiter"> | Date | string | null
    profileComplete?: BoolWithAggregatesFilter<"Recruiter"> | boolean
    emailVerified?: BoolWithAggregatesFilter<"Recruiter"> | boolean
    phoneVerified?: BoolWithAggregatesFilter<"Recruiter"> | boolean
    bio?: StringNullableWithAggregatesFilter<"Recruiter"> | string | null
    linkedinUrl?: StringNullableWithAggregatesFilter<"Recruiter"> | string | null
    companyDescription?: StringNullableWithAggregatesFilter<"Recruiter"> | string | null
    companyLogo?: StringNullableWithAggregatesFilter<"Recruiter"> | string | null
    companyBenefits?: StringNullableListFilter<"Recruiter">
    hiringNeeds?: StringNullableListFilter<"Recruiter">
    preferredLocations?: StringNullableListFilter<"Recruiter">
  }

  export type JobWhereInput = {
    AND?: JobWhereInput | JobWhereInput[]
    OR?: JobWhereInput[]
    NOT?: JobWhereInput | JobWhereInput[]
    id?: StringFilter<"Job"> | string
    title?: StringFilter<"Job"> | string
    department?: StringNullableFilter<"Job"> | string | null
    company?: StringFilter<"Job"> | string
    companyId?: StringNullableFilter<"Job"> | string | null
    location?: StringFilter<"Job"> | string
    locationType?: StringFilter<"Job"> | string
    employmentType?: StringFilter<"Job"> | string
    experienceLevel?: StringNullableFilter<"Job"> | string | null
    salaryMin?: IntNullableFilter<"Job"> | number | null
    salaryMax?: IntNullableFilter<"Job"> | number | null
    salaryCurrency?: StringNullableFilter<"Job"> | string | null
    salaryPeriod?: StringNullableFilter<"Job"> | string | null
    description?: StringFilter<"Job"> | string
    responsibilities?: StringNullableListFilter<"Job">
    requirements?: StringNullableListFilter<"Job">
    benefits?: StringNullableListFilter<"Job">
    applicationDeadline?: StringNullableFilter<"Job"> | string | null
    applicationUrl?: StringNullableFilter<"Job"> | string | null
    postedDate?: DateTimeFilter<"Job"> | Date | string
    postedBy?: StringFilter<"Job"> | string
    applicantsCount?: IntFilter<"Job"> | number
    recruiter?: XOR<RecruiterScalarRelationFilter, RecruiterWhereInput>
    applications?: JobApplicationListRelationFilter
  }

  export type JobOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    department?: SortOrder
    company?: SortOrder
    companyId?: SortOrder
    location?: SortOrder
    locationType?: SortOrder
    employmentType?: SortOrder
    experienceLevel?: SortOrder
    salaryMin?: SortOrder
    salaryMax?: SortOrder
    salaryCurrency?: SortOrder
    salaryPeriod?: SortOrder
    description?: SortOrder
    responsibilities?: SortOrder
    requirements?: SortOrder
    benefits?: SortOrder
    applicationDeadline?: SortOrder
    applicationUrl?: SortOrder
    postedDate?: SortOrder
    postedBy?: SortOrder
    applicantsCount?: SortOrder
    recruiter?: RecruiterOrderByWithRelationInput
    applications?: JobApplicationOrderByRelationAggregateInput
  }

  export type JobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JobWhereInput | JobWhereInput[]
    OR?: JobWhereInput[]
    NOT?: JobWhereInput | JobWhereInput[]
    title?: StringFilter<"Job"> | string
    department?: StringNullableFilter<"Job"> | string | null
    company?: StringFilter<"Job"> | string
    companyId?: StringNullableFilter<"Job"> | string | null
    location?: StringFilter<"Job"> | string
    locationType?: StringFilter<"Job"> | string
    employmentType?: StringFilter<"Job"> | string
    experienceLevel?: StringNullableFilter<"Job"> | string | null
    salaryMin?: IntNullableFilter<"Job"> | number | null
    salaryMax?: IntNullableFilter<"Job"> | number | null
    salaryCurrency?: StringNullableFilter<"Job"> | string | null
    salaryPeriod?: StringNullableFilter<"Job"> | string | null
    description?: StringFilter<"Job"> | string
    responsibilities?: StringNullableListFilter<"Job">
    requirements?: StringNullableListFilter<"Job">
    benefits?: StringNullableListFilter<"Job">
    applicationDeadline?: StringNullableFilter<"Job"> | string | null
    applicationUrl?: StringNullableFilter<"Job"> | string | null
    postedDate?: DateTimeFilter<"Job"> | Date | string
    postedBy?: StringFilter<"Job"> | string
    applicantsCount?: IntFilter<"Job"> | number
    recruiter?: XOR<RecruiterScalarRelationFilter, RecruiterWhereInput>
    applications?: JobApplicationListRelationFilter
  }, "id">

  export type JobOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    department?: SortOrder
    company?: SortOrder
    companyId?: SortOrder
    location?: SortOrder
    locationType?: SortOrder
    employmentType?: SortOrder
    experienceLevel?: SortOrder
    salaryMin?: SortOrder
    salaryMax?: SortOrder
    salaryCurrency?: SortOrder
    salaryPeriod?: SortOrder
    description?: SortOrder
    responsibilities?: SortOrder
    requirements?: SortOrder
    benefits?: SortOrder
    applicationDeadline?: SortOrder
    applicationUrl?: SortOrder
    postedDate?: SortOrder
    postedBy?: SortOrder
    applicantsCount?: SortOrder
    _count?: JobCountOrderByAggregateInput
    _avg?: JobAvgOrderByAggregateInput
    _max?: JobMaxOrderByAggregateInput
    _min?: JobMinOrderByAggregateInput
    _sum?: JobSumOrderByAggregateInput
  }

  export type JobScalarWhereWithAggregatesInput = {
    AND?: JobScalarWhereWithAggregatesInput | JobScalarWhereWithAggregatesInput[]
    OR?: JobScalarWhereWithAggregatesInput[]
    NOT?: JobScalarWhereWithAggregatesInput | JobScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Job"> | string
    title?: StringWithAggregatesFilter<"Job"> | string
    department?: StringNullableWithAggregatesFilter<"Job"> | string | null
    company?: StringWithAggregatesFilter<"Job"> | string
    companyId?: StringNullableWithAggregatesFilter<"Job"> | string | null
    location?: StringWithAggregatesFilter<"Job"> | string
    locationType?: StringWithAggregatesFilter<"Job"> | string
    employmentType?: StringWithAggregatesFilter<"Job"> | string
    experienceLevel?: StringNullableWithAggregatesFilter<"Job"> | string | null
    salaryMin?: IntNullableWithAggregatesFilter<"Job"> | number | null
    salaryMax?: IntNullableWithAggregatesFilter<"Job"> | number | null
    salaryCurrency?: StringNullableWithAggregatesFilter<"Job"> | string | null
    salaryPeriod?: StringNullableWithAggregatesFilter<"Job"> | string | null
    description?: StringWithAggregatesFilter<"Job"> | string
    responsibilities?: StringNullableListFilter<"Job">
    requirements?: StringNullableListFilter<"Job">
    benefits?: StringNullableListFilter<"Job">
    applicationDeadline?: StringNullableWithAggregatesFilter<"Job"> | string | null
    applicationUrl?: StringNullableWithAggregatesFilter<"Job"> | string | null
    postedDate?: DateTimeWithAggregatesFilter<"Job"> | Date | string
    postedBy?: StringWithAggregatesFilter<"Job"> | string
    applicantsCount?: IntWithAggregatesFilter<"Job"> | number
  }

  export type JobApplicationWhereInput = {
    AND?: JobApplicationWhereInput | JobApplicationWhereInput[]
    OR?: JobApplicationWhereInput[]
    NOT?: JobApplicationWhereInput | JobApplicationWhereInput[]
    id?: StringFilter<"JobApplication"> | string
    jobId?: StringFilter<"JobApplication"> | string
    jobSeekerId?: StringFilter<"JobApplication"> | string
    recruiterId?: StringFilter<"JobApplication"> | string
    resumeUrl?: StringNullableFilter<"JobApplication"> | string | null
    coverLetter?: StringNullableFilter<"JobApplication"> | string | null
    expectedSalary?: StringNullableFilter<"JobApplication"> | string | null
    noticePeriod?: StringNullableFilter<"JobApplication"> | string | null
    availabilityDate?: StringNullableFilter<"JobApplication"> | string | null
    status?: StringFilter<"JobApplication"> | string
    appliedDate?: DateTimeFilter<"JobApplication"> | Date | string
    reviewedDate?: DateTimeNullableFilter<"JobApplication"> | Date | string | null
    notes?: StringNullableFilter<"JobApplication"> | string | null
    portfolioUrl?: StringNullableFilter<"JobApplication"> | string | null
    linkedinUrl?: StringNullableFilter<"JobApplication"> | string | null
    githubUrl?: StringNullableFilter<"JobApplication"> | string | null
    additionalNotes?: StringNullableFilter<"JobApplication"> | string | null
    job?: XOR<JobScalarRelationFilter, JobWhereInput>
    jobSeeker?: XOR<JobSeekerScalarRelationFilter, JobSeekerWhereInput>
    recruiter?: XOR<RecruiterScalarRelationFilter, RecruiterWhereInput>
  }

  export type JobApplicationOrderByWithRelationInput = {
    id?: SortOrder
    jobId?: SortOrder
    jobSeekerId?: SortOrder
    recruiterId?: SortOrder
    resumeUrl?: SortOrder
    coverLetter?: SortOrder
    expectedSalary?: SortOrder
    noticePeriod?: SortOrder
    availabilityDate?: SortOrder
    status?: SortOrder
    appliedDate?: SortOrder
    reviewedDate?: SortOrder
    notes?: SortOrder
    portfolioUrl?: SortOrder
    linkedinUrl?: SortOrder
    githubUrl?: SortOrder
    additionalNotes?: SortOrder
    job?: JobOrderByWithRelationInput
    jobSeeker?: JobSeekerOrderByWithRelationInput
    recruiter?: RecruiterOrderByWithRelationInput
  }

  export type JobApplicationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JobApplicationWhereInput | JobApplicationWhereInput[]
    OR?: JobApplicationWhereInput[]
    NOT?: JobApplicationWhereInput | JobApplicationWhereInput[]
    jobId?: StringFilter<"JobApplication"> | string
    jobSeekerId?: StringFilter<"JobApplication"> | string
    recruiterId?: StringFilter<"JobApplication"> | string
    resumeUrl?: StringNullableFilter<"JobApplication"> | string | null
    coverLetter?: StringNullableFilter<"JobApplication"> | string | null
    expectedSalary?: StringNullableFilter<"JobApplication"> | string | null
    noticePeriod?: StringNullableFilter<"JobApplication"> | string | null
    availabilityDate?: StringNullableFilter<"JobApplication"> | string | null
    status?: StringFilter<"JobApplication"> | string
    appliedDate?: DateTimeFilter<"JobApplication"> | Date | string
    reviewedDate?: DateTimeNullableFilter<"JobApplication"> | Date | string | null
    notes?: StringNullableFilter<"JobApplication"> | string | null
    portfolioUrl?: StringNullableFilter<"JobApplication"> | string | null
    linkedinUrl?: StringNullableFilter<"JobApplication"> | string | null
    githubUrl?: StringNullableFilter<"JobApplication"> | string | null
    additionalNotes?: StringNullableFilter<"JobApplication"> | string | null
    job?: XOR<JobScalarRelationFilter, JobWhereInput>
    jobSeeker?: XOR<JobSeekerScalarRelationFilter, JobSeekerWhereInput>
    recruiter?: XOR<RecruiterScalarRelationFilter, RecruiterWhereInput>
  }, "id">

  export type JobApplicationOrderByWithAggregationInput = {
    id?: SortOrder
    jobId?: SortOrder
    jobSeekerId?: SortOrder
    recruiterId?: SortOrder
    resumeUrl?: SortOrder
    coverLetter?: SortOrder
    expectedSalary?: SortOrder
    noticePeriod?: SortOrder
    availabilityDate?: SortOrder
    status?: SortOrder
    appliedDate?: SortOrder
    reviewedDate?: SortOrder
    notes?: SortOrder
    portfolioUrl?: SortOrder
    linkedinUrl?: SortOrder
    githubUrl?: SortOrder
    additionalNotes?: SortOrder
    _count?: JobApplicationCountOrderByAggregateInput
    _max?: JobApplicationMaxOrderByAggregateInput
    _min?: JobApplicationMinOrderByAggregateInput
  }

  export type JobApplicationScalarWhereWithAggregatesInput = {
    AND?: JobApplicationScalarWhereWithAggregatesInput | JobApplicationScalarWhereWithAggregatesInput[]
    OR?: JobApplicationScalarWhereWithAggregatesInput[]
    NOT?: JobApplicationScalarWhereWithAggregatesInput | JobApplicationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JobApplication"> | string
    jobId?: StringWithAggregatesFilter<"JobApplication"> | string
    jobSeekerId?: StringWithAggregatesFilter<"JobApplication"> | string
    recruiterId?: StringWithAggregatesFilter<"JobApplication"> | string
    resumeUrl?: StringNullableWithAggregatesFilter<"JobApplication"> | string | null
    coverLetter?: StringNullableWithAggregatesFilter<"JobApplication"> | string | null
    expectedSalary?: StringNullableWithAggregatesFilter<"JobApplication"> | string | null
    noticePeriod?: StringNullableWithAggregatesFilter<"JobApplication"> | string | null
    availabilityDate?: StringNullableWithAggregatesFilter<"JobApplication"> | string | null
    status?: StringWithAggregatesFilter<"JobApplication"> | string
    appliedDate?: DateTimeWithAggregatesFilter<"JobApplication"> | Date | string
    reviewedDate?: DateTimeNullableWithAggregatesFilter<"JobApplication"> | Date | string | null
    notes?: StringNullableWithAggregatesFilter<"JobApplication"> | string | null
    portfolioUrl?: StringNullableWithAggregatesFilter<"JobApplication"> | string | null
    linkedinUrl?: StringNullableWithAggregatesFilter<"JobApplication"> | string | null
    githubUrl?: StringNullableWithAggregatesFilter<"JobApplication"> | string | null
    additionalNotes?: StringNullableWithAggregatesFilter<"JobApplication"> | string | null
  }

  export type ResumeWhereInput = {
    AND?: ResumeWhereInput | ResumeWhereInput[]
    OR?: ResumeWhereInput[]
    NOT?: ResumeWhereInput | ResumeWhereInput[]
    id?: StringFilter<"Resume"> | string
    jobSeekerId?: StringFilter<"Resume"> | string
    name?: StringFilter<"Resume"> | string
    template?: StringFilter<"Resume"> | string
    data?: JsonFilter<"Resume">
    lastModified?: DateTimeFilter<"Resume"> | Date | string
    jobApplications?: IntFilter<"Resume"> | number
    isActive?: BoolFilter<"Resume"> | boolean
    jobSeeker?: XOR<JobSeekerScalarRelationFilter, JobSeekerWhereInput>
  }

  export type ResumeOrderByWithRelationInput = {
    id?: SortOrder
    jobSeekerId?: SortOrder
    name?: SortOrder
    template?: SortOrder
    data?: SortOrder
    lastModified?: SortOrder
    jobApplications?: SortOrder
    isActive?: SortOrder
    jobSeeker?: JobSeekerOrderByWithRelationInput
  }

  export type ResumeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ResumeWhereInput | ResumeWhereInput[]
    OR?: ResumeWhereInput[]
    NOT?: ResumeWhereInput | ResumeWhereInput[]
    jobSeekerId?: StringFilter<"Resume"> | string
    name?: StringFilter<"Resume"> | string
    template?: StringFilter<"Resume"> | string
    data?: JsonFilter<"Resume">
    lastModified?: DateTimeFilter<"Resume"> | Date | string
    jobApplications?: IntFilter<"Resume"> | number
    isActive?: BoolFilter<"Resume"> | boolean
    jobSeeker?: XOR<JobSeekerScalarRelationFilter, JobSeekerWhereInput>
  }, "id">

  export type ResumeOrderByWithAggregationInput = {
    id?: SortOrder
    jobSeekerId?: SortOrder
    name?: SortOrder
    template?: SortOrder
    data?: SortOrder
    lastModified?: SortOrder
    jobApplications?: SortOrder
    isActive?: SortOrder
    _count?: ResumeCountOrderByAggregateInput
    _avg?: ResumeAvgOrderByAggregateInput
    _max?: ResumeMaxOrderByAggregateInput
    _min?: ResumeMinOrderByAggregateInput
    _sum?: ResumeSumOrderByAggregateInput
  }

  export type ResumeScalarWhereWithAggregatesInput = {
    AND?: ResumeScalarWhereWithAggregatesInput | ResumeScalarWhereWithAggregatesInput[]
    OR?: ResumeScalarWhereWithAggregatesInput[]
    NOT?: ResumeScalarWhereWithAggregatesInput | ResumeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Resume"> | string
    jobSeekerId?: StringWithAggregatesFilter<"Resume"> | string
    name?: StringWithAggregatesFilter<"Resume"> | string
    template?: StringWithAggregatesFilter<"Resume"> | string
    data?: JsonWithAggregatesFilter<"Resume">
    lastModified?: DateTimeWithAggregatesFilter<"Resume"> | Date | string
    jobApplications?: IntWithAggregatesFilter<"Resume"> | number
    isActive?: BoolWithAggregatesFilter<"Resume"> | boolean
  }

  export type JobSeekerCreateInput = {
    id?: string
    email: string
    password?: string | null
    fullName: string
    phone?: string | null
    currentJobTitle?: string | null
    yearsOfExperience?: string | null
    education?: string | null
    skills?: JobSeekerCreateskillsInput | string[]
    resume?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    lastLogin?: Date | string | null
    profileComplete?: boolean
    emailVerified?: boolean
    phoneVerified?: boolean
    bio?: string | null
    linkedinUrl?: string | null
    githubUrl?: string | null
    portfolioUrl?: string | null
    preferredJobTypes?: JobSeekerCreatepreferredJobTypesInput | string[]
    expectedSalary?: string | null
    noticePeriod?: string | null
    languages?: JobSeekerCreatelanguagesInput | string[]
    certifications?: JobSeekerCreatecertificationsInput | string[]
    applications?: JobApplicationCreateNestedManyWithoutJobSeekerInput
    resumes?: ResumeCreateNestedManyWithoutJobSeekerInput
  }

  export type JobSeekerUncheckedCreateInput = {
    id?: string
    email: string
    password?: string | null
    fullName: string
    phone?: string | null
    currentJobTitle?: string | null
    yearsOfExperience?: string | null
    education?: string | null
    skills?: JobSeekerCreateskillsInput | string[]
    resume?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    lastLogin?: Date | string | null
    profileComplete?: boolean
    emailVerified?: boolean
    phoneVerified?: boolean
    bio?: string | null
    linkedinUrl?: string | null
    githubUrl?: string | null
    portfolioUrl?: string | null
    preferredJobTypes?: JobSeekerCreatepreferredJobTypesInput | string[]
    expectedSalary?: string | null
    noticePeriod?: string | null
    languages?: JobSeekerCreatelanguagesInput | string[]
    certifications?: JobSeekerCreatecertificationsInput | string[]
    applications?: JobApplicationUncheckedCreateNestedManyWithoutJobSeekerInput
    resumes?: ResumeUncheckedCreateNestedManyWithoutJobSeekerInput
  }

  export type JobSeekerUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    currentJobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    yearsOfExperience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JobSeekerUpdateskillsInput | string[]
    resume?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    preferredJobTypes?: JobSeekerUpdatepreferredJobTypesInput | string[]
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    noticePeriod?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: JobSeekerUpdatelanguagesInput | string[]
    certifications?: JobSeekerUpdatecertificationsInput | string[]
    applications?: JobApplicationUpdateManyWithoutJobSeekerNestedInput
    resumes?: ResumeUpdateManyWithoutJobSeekerNestedInput
  }

  export type JobSeekerUncheckedUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    currentJobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    yearsOfExperience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JobSeekerUpdateskillsInput | string[]
    resume?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    preferredJobTypes?: JobSeekerUpdatepreferredJobTypesInput | string[]
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    noticePeriod?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: JobSeekerUpdatelanguagesInput | string[]
    certifications?: JobSeekerUpdatecertificationsInput | string[]
    applications?: JobApplicationUncheckedUpdateManyWithoutJobSeekerNestedInput
    resumes?: ResumeUncheckedUpdateManyWithoutJobSeekerNestedInput
  }

  export type JobSeekerCreateManyInput = {
    id?: string
    email: string
    password?: string | null
    fullName: string
    phone?: string | null
    currentJobTitle?: string | null
    yearsOfExperience?: string | null
    education?: string | null
    skills?: JobSeekerCreateskillsInput | string[]
    resume?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    lastLogin?: Date | string | null
    profileComplete?: boolean
    emailVerified?: boolean
    phoneVerified?: boolean
    bio?: string | null
    linkedinUrl?: string | null
    githubUrl?: string | null
    portfolioUrl?: string | null
    preferredJobTypes?: JobSeekerCreatepreferredJobTypesInput | string[]
    expectedSalary?: string | null
    noticePeriod?: string | null
    languages?: JobSeekerCreatelanguagesInput | string[]
    certifications?: JobSeekerCreatecertificationsInput | string[]
  }

  export type JobSeekerUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    currentJobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    yearsOfExperience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JobSeekerUpdateskillsInput | string[]
    resume?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    preferredJobTypes?: JobSeekerUpdatepreferredJobTypesInput | string[]
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    noticePeriod?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: JobSeekerUpdatelanguagesInput | string[]
    certifications?: JobSeekerUpdatecertificationsInput | string[]
  }

  export type JobSeekerUncheckedUpdateManyInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    currentJobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    yearsOfExperience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JobSeekerUpdateskillsInput | string[]
    resume?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    preferredJobTypes?: JobSeekerUpdatepreferredJobTypesInput | string[]
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    noticePeriod?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: JobSeekerUpdatelanguagesInput | string[]
    certifications?: JobSeekerUpdatecertificationsInput | string[]
  }

  export type RecruiterCreateInput = {
    id?: string
    email: string
    password?: string | null
    companyName: string
    fullName: string
    phone?: string | null
    position?: string | null
    companySize?: string | null
    industry?: string | null
    website?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    lastLogin?: Date | string | null
    profileComplete?: boolean
    emailVerified?: boolean
    phoneVerified?: boolean
    bio?: string | null
    linkedinUrl?: string | null
    companyDescription?: string | null
    companyLogo?: string | null
    companyBenefits?: RecruiterCreatecompanyBenefitsInput | string[]
    hiringNeeds?: RecruiterCreatehiringNeedsInput | string[]
    preferredLocations?: RecruiterCreatepreferredLocationsInput | string[]
    jobs?: JobCreateNestedManyWithoutRecruiterInput
    applications?: JobApplicationCreateNestedManyWithoutRecruiterInput
  }

  export type RecruiterUncheckedCreateInput = {
    id?: string
    email: string
    password?: string | null
    companyName: string
    fullName: string
    phone?: string | null
    position?: string | null
    companySize?: string | null
    industry?: string | null
    website?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    lastLogin?: Date | string | null
    profileComplete?: boolean
    emailVerified?: boolean
    phoneVerified?: boolean
    bio?: string | null
    linkedinUrl?: string | null
    companyDescription?: string | null
    companyLogo?: string | null
    companyBenefits?: RecruiterCreatecompanyBenefitsInput | string[]
    hiringNeeds?: RecruiterCreatehiringNeedsInput | string[]
    preferredLocations?: RecruiterCreatepreferredLocationsInput | string[]
    jobs?: JobUncheckedCreateNestedManyWithoutRecruiterInput
    applications?: JobApplicationUncheckedCreateNestedManyWithoutRecruiterInput
  }

  export type RecruiterUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    companyLogo?: NullableStringFieldUpdateOperationsInput | string | null
    companyBenefits?: RecruiterUpdatecompanyBenefitsInput | string[]
    hiringNeeds?: RecruiterUpdatehiringNeedsInput | string[]
    preferredLocations?: RecruiterUpdatepreferredLocationsInput | string[]
    jobs?: JobUpdateManyWithoutRecruiterNestedInput
    applications?: JobApplicationUpdateManyWithoutRecruiterNestedInput
  }

  export type RecruiterUncheckedUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    companyLogo?: NullableStringFieldUpdateOperationsInput | string | null
    companyBenefits?: RecruiterUpdatecompanyBenefitsInput | string[]
    hiringNeeds?: RecruiterUpdatehiringNeedsInput | string[]
    preferredLocations?: RecruiterUpdatepreferredLocationsInput | string[]
    jobs?: JobUncheckedUpdateManyWithoutRecruiterNestedInput
    applications?: JobApplicationUncheckedUpdateManyWithoutRecruiterNestedInput
  }

  export type RecruiterCreateManyInput = {
    id?: string
    email: string
    password?: string | null
    companyName: string
    fullName: string
    phone?: string | null
    position?: string | null
    companySize?: string | null
    industry?: string | null
    website?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    lastLogin?: Date | string | null
    profileComplete?: boolean
    emailVerified?: boolean
    phoneVerified?: boolean
    bio?: string | null
    linkedinUrl?: string | null
    companyDescription?: string | null
    companyLogo?: string | null
    companyBenefits?: RecruiterCreatecompanyBenefitsInput | string[]
    hiringNeeds?: RecruiterCreatehiringNeedsInput | string[]
    preferredLocations?: RecruiterCreatepreferredLocationsInput | string[]
  }

  export type RecruiterUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    companyLogo?: NullableStringFieldUpdateOperationsInput | string | null
    companyBenefits?: RecruiterUpdatecompanyBenefitsInput | string[]
    hiringNeeds?: RecruiterUpdatehiringNeedsInput | string[]
    preferredLocations?: RecruiterUpdatepreferredLocationsInput | string[]
  }

  export type RecruiterUncheckedUpdateManyInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    companyLogo?: NullableStringFieldUpdateOperationsInput | string | null
    companyBenefits?: RecruiterUpdatecompanyBenefitsInput | string[]
    hiringNeeds?: RecruiterUpdatehiringNeedsInput | string[]
    preferredLocations?: RecruiterUpdatepreferredLocationsInput | string[]
  }

  export type JobCreateInput = {
    id?: string
    title: string
    department?: string | null
    company: string
    companyId?: string | null
    location: string
    locationType: string
    employmentType: string
    experienceLevel?: string | null
    salaryMin?: number | null
    salaryMax?: number | null
    salaryCurrency?: string | null
    salaryPeriod?: string | null
    description: string
    responsibilities?: JobCreateresponsibilitiesInput | string[]
    requirements?: JobCreaterequirementsInput | string[]
    benefits?: JobCreatebenefitsInput | string[]
    applicationDeadline?: string | null
    applicationUrl?: string | null
    postedDate?: Date | string
    applicantsCount?: number
    recruiter: RecruiterCreateNestedOneWithoutJobsInput
    applications?: JobApplicationCreateNestedManyWithoutJobInput
  }

  export type JobUncheckedCreateInput = {
    id?: string
    title: string
    department?: string | null
    company: string
    companyId?: string | null
    location: string
    locationType: string
    employmentType: string
    experienceLevel?: string | null
    salaryMin?: number | null
    salaryMax?: number | null
    salaryCurrency?: string | null
    salaryPeriod?: string | null
    description: string
    responsibilities?: JobCreateresponsibilitiesInput | string[]
    requirements?: JobCreaterequirementsInput | string[]
    benefits?: JobCreatebenefitsInput | string[]
    applicationDeadline?: string | null
    applicationUrl?: string | null
    postedDate?: Date | string
    postedBy: string
    applicantsCount?: number
    applications?: JobApplicationUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    company?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    location?: StringFieldUpdateOperationsInput | string
    locationType?: StringFieldUpdateOperationsInput | string
    employmentType?: StringFieldUpdateOperationsInput | string
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    salaryMin?: NullableIntFieldUpdateOperationsInput | number | null
    salaryMax?: NullableIntFieldUpdateOperationsInput | number | null
    salaryCurrency?: NullableStringFieldUpdateOperationsInput | string | null
    salaryPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    responsibilities?: JobUpdateresponsibilitiesInput | string[]
    requirements?: JobUpdaterequirementsInput | string[]
    benefits?: JobUpdatebenefitsInput | string[]
    applicationDeadline?: NullableStringFieldUpdateOperationsInput | string | null
    applicationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    applicantsCount?: IntFieldUpdateOperationsInput | number
    recruiter?: RecruiterUpdateOneRequiredWithoutJobsNestedInput
    applications?: JobApplicationUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    company?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    location?: StringFieldUpdateOperationsInput | string
    locationType?: StringFieldUpdateOperationsInput | string
    employmentType?: StringFieldUpdateOperationsInput | string
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    salaryMin?: NullableIntFieldUpdateOperationsInput | number | null
    salaryMax?: NullableIntFieldUpdateOperationsInput | number | null
    salaryCurrency?: NullableStringFieldUpdateOperationsInput | string | null
    salaryPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    responsibilities?: JobUpdateresponsibilitiesInput | string[]
    requirements?: JobUpdaterequirementsInput | string[]
    benefits?: JobUpdatebenefitsInput | string[]
    applicationDeadline?: NullableStringFieldUpdateOperationsInput | string | null
    applicationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    postedBy?: StringFieldUpdateOperationsInput | string
    applicantsCount?: IntFieldUpdateOperationsInput | number
    applications?: JobApplicationUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobCreateManyInput = {
    id?: string
    title: string
    department?: string | null
    company: string
    companyId?: string | null
    location: string
    locationType: string
    employmentType: string
    experienceLevel?: string | null
    salaryMin?: number | null
    salaryMax?: number | null
    salaryCurrency?: string | null
    salaryPeriod?: string | null
    description: string
    responsibilities?: JobCreateresponsibilitiesInput | string[]
    requirements?: JobCreaterequirementsInput | string[]
    benefits?: JobCreatebenefitsInput | string[]
    applicationDeadline?: string | null
    applicationUrl?: string | null
    postedDate?: Date | string
    postedBy: string
    applicantsCount?: number
  }

  export type JobUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    company?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    location?: StringFieldUpdateOperationsInput | string
    locationType?: StringFieldUpdateOperationsInput | string
    employmentType?: StringFieldUpdateOperationsInput | string
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    salaryMin?: NullableIntFieldUpdateOperationsInput | number | null
    salaryMax?: NullableIntFieldUpdateOperationsInput | number | null
    salaryCurrency?: NullableStringFieldUpdateOperationsInput | string | null
    salaryPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    responsibilities?: JobUpdateresponsibilitiesInput | string[]
    requirements?: JobUpdaterequirementsInput | string[]
    benefits?: JobUpdatebenefitsInput | string[]
    applicationDeadline?: NullableStringFieldUpdateOperationsInput | string | null
    applicationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    applicantsCount?: IntFieldUpdateOperationsInput | number
  }

  export type JobUncheckedUpdateManyInput = {
    title?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    company?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    location?: StringFieldUpdateOperationsInput | string
    locationType?: StringFieldUpdateOperationsInput | string
    employmentType?: StringFieldUpdateOperationsInput | string
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    salaryMin?: NullableIntFieldUpdateOperationsInput | number | null
    salaryMax?: NullableIntFieldUpdateOperationsInput | number | null
    salaryCurrency?: NullableStringFieldUpdateOperationsInput | string | null
    salaryPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    responsibilities?: JobUpdateresponsibilitiesInput | string[]
    requirements?: JobUpdaterequirementsInput | string[]
    benefits?: JobUpdatebenefitsInput | string[]
    applicationDeadline?: NullableStringFieldUpdateOperationsInput | string | null
    applicationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    postedBy?: StringFieldUpdateOperationsInput | string
    applicantsCount?: IntFieldUpdateOperationsInput | number
  }

  export type JobApplicationCreateInput = {
    id?: string
    resumeUrl?: string | null
    coverLetter?: string | null
    expectedSalary?: string | null
    noticePeriod?: string | null
    availabilityDate?: string | null
    status?: string
    appliedDate?: Date | string
    reviewedDate?: Date | string | null
    notes?: string | null
    portfolioUrl?: string | null
    linkedinUrl?: string | null
    githubUrl?: string | null
    additionalNotes?: string | null
    job: JobCreateNestedOneWithoutApplicationsInput
    jobSeeker: JobSeekerCreateNestedOneWithoutApplicationsInput
    recruiter: RecruiterCreateNestedOneWithoutApplicationsInput
  }

  export type JobApplicationUncheckedCreateInput = {
    id?: string
    jobId: string
    jobSeekerId: string
    recruiterId: string
    resumeUrl?: string | null
    coverLetter?: string | null
    expectedSalary?: string | null
    noticePeriod?: string | null
    availabilityDate?: string | null
    status?: string
    appliedDate?: Date | string
    reviewedDate?: Date | string | null
    notes?: string | null
    portfolioUrl?: string | null
    linkedinUrl?: string | null
    githubUrl?: string | null
    additionalNotes?: string | null
  }

  export type JobApplicationUpdateInput = {
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    noticePeriod?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityDate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    appliedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    job?: JobUpdateOneRequiredWithoutApplicationsNestedInput
    jobSeeker?: JobSeekerUpdateOneRequiredWithoutApplicationsNestedInput
    recruiter?: RecruiterUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type JobApplicationUncheckedUpdateInput = {
    jobId?: StringFieldUpdateOperationsInput | string
    jobSeekerId?: StringFieldUpdateOperationsInput | string
    recruiterId?: StringFieldUpdateOperationsInput | string
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    noticePeriod?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityDate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    appliedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JobApplicationCreateManyInput = {
    id?: string
    jobId: string
    jobSeekerId: string
    recruiterId: string
    resumeUrl?: string | null
    coverLetter?: string | null
    expectedSalary?: string | null
    noticePeriod?: string | null
    availabilityDate?: string | null
    status?: string
    appliedDate?: Date | string
    reviewedDate?: Date | string | null
    notes?: string | null
    portfolioUrl?: string | null
    linkedinUrl?: string | null
    githubUrl?: string | null
    additionalNotes?: string | null
  }

  export type JobApplicationUpdateManyMutationInput = {
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    noticePeriod?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityDate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    appliedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JobApplicationUncheckedUpdateManyInput = {
    jobId?: StringFieldUpdateOperationsInput | string
    jobSeekerId?: StringFieldUpdateOperationsInput | string
    recruiterId?: StringFieldUpdateOperationsInput | string
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    noticePeriod?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityDate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    appliedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResumeCreateInput = {
    id?: string
    name: string
    template: string
    data: InputJsonValue
    lastModified?: Date | string
    jobApplications?: number
    isActive?: boolean
    jobSeeker: JobSeekerCreateNestedOneWithoutResumesInput
  }

  export type ResumeUncheckedCreateInput = {
    id?: string
    jobSeekerId: string
    name: string
    template: string
    data: InputJsonValue
    lastModified?: Date | string
    jobApplications?: number
    isActive?: boolean
  }

  export type ResumeUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    data?: InputJsonValue | InputJsonValue
    lastModified?: DateTimeFieldUpdateOperationsInput | Date | string
    jobApplications?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    jobSeeker?: JobSeekerUpdateOneRequiredWithoutResumesNestedInput
  }

  export type ResumeUncheckedUpdateInput = {
    jobSeekerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    data?: InputJsonValue | InputJsonValue
    lastModified?: DateTimeFieldUpdateOperationsInput | Date | string
    jobApplications?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ResumeCreateManyInput = {
    id?: string
    jobSeekerId: string
    name: string
    template: string
    data: InputJsonValue
    lastModified?: Date | string
    jobApplications?: number
    isActive?: boolean
  }

  export type ResumeUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    data?: InputJsonValue | InputJsonValue
    lastModified?: DateTimeFieldUpdateOperationsInput | Date | string
    jobApplications?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ResumeUncheckedUpdateManyInput = {
    jobSeekerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    data?: InputJsonValue | InputJsonValue
    lastModified?: DateTimeFieldUpdateOperationsInput | Date | string
    jobApplications?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type JobApplicationListRelationFilter = {
    every?: JobApplicationWhereInput
    some?: JobApplicationWhereInput
    none?: JobApplicationWhereInput
  }

  export type ResumeListRelationFilter = {
    every?: ResumeWhereInput
    some?: ResumeWhereInput
    none?: ResumeWhereInput
  }

  export type JobApplicationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResumeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JobSeekerCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    currentJobTitle?: SortOrder
    yearsOfExperience?: SortOrder
    education?: SortOrder
    skills?: SortOrder
    resume?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    profileComplete?: SortOrder
    emailVerified?: SortOrder
    phoneVerified?: SortOrder
    bio?: SortOrder
    linkedinUrl?: SortOrder
    githubUrl?: SortOrder
    portfolioUrl?: SortOrder
    preferredJobTypes?: SortOrder
    expectedSalary?: SortOrder
    noticePeriod?: SortOrder
    languages?: SortOrder
    certifications?: SortOrder
  }

  export type JobSeekerMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    currentJobTitle?: SortOrder
    yearsOfExperience?: SortOrder
    education?: SortOrder
    resume?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    profileComplete?: SortOrder
    emailVerified?: SortOrder
    phoneVerified?: SortOrder
    bio?: SortOrder
    linkedinUrl?: SortOrder
    githubUrl?: SortOrder
    portfolioUrl?: SortOrder
    expectedSalary?: SortOrder
    noticePeriod?: SortOrder
  }

  export type JobSeekerMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    currentJobTitle?: SortOrder
    yearsOfExperience?: SortOrder
    education?: SortOrder
    resume?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    profileComplete?: SortOrder
    emailVerified?: SortOrder
    phoneVerified?: SortOrder
    bio?: SortOrder
    linkedinUrl?: SortOrder
    githubUrl?: SortOrder
    portfolioUrl?: SortOrder
    expectedSalary?: SortOrder
    noticePeriod?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type JobListRelationFilter = {
    every?: JobWhereInput
    some?: JobWhereInput
    none?: JobWhereInput
  }

  export type JobOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RecruiterCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    companyName?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    position?: SortOrder
    companySize?: SortOrder
    industry?: SortOrder
    website?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    profileComplete?: SortOrder
    emailVerified?: SortOrder
    phoneVerified?: SortOrder
    bio?: SortOrder
    linkedinUrl?: SortOrder
    companyDescription?: SortOrder
    companyLogo?: SortOrder
    companyBenefits?: SortOrder
    hiringNeeds?: SortOrder
    preferredLocations?: SortOrder
  }

  export type RecruiterMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    companyName?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    position?: SortOrder
    companySize?: SortOrder
    industry?: SortOrder
    website?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    profileComplete?: SortOrder
    emailVerified?: SortOrder
    phoneVerified?: SortOrder
    bio?: SortOrder
    linkedinUrl?: SortOrder
    companyDescription?: SortOrder
    companyLogo?: SortOrder
  }

  export type RecruiterMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    companyName?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
    position?: SortOrder
    companySize?: SortOrder
    industry?: SortOrder
    website?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    profileComplete?: SortOrder
    emailVerified?: SortOrder
    phoneVerified?: SortOrder
    bio?: SortOrder
    linkedinUrl?: SortOrder
    companyDescription?: SortOrder
    companyLogo?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type RecruiterScalarRelationFilter = {
    is?: RecruiterWhereInput
    isNot?: RecruiterWhereInput
  }

  export type JobCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    department?: SortOrder
    company?: SortOrder
    companyId?: SortOrder
    location?: SortOrder
    locationType?: SortOrder
    employmentType?: SortOrder
    experienceLevel?: SortOrder
    salaryMin?: SortOrder
    salaryMax?: SortOrder
    salaryCurrency?: SortOrder
    salaryPeriod?: SortOrder
    description?: SortOrder
    responsibilities?: SortOrder
    requirements?: SortOrder
    benefits?: SortOrder
    applicationDeadline?: SortOrder
    applicationUrl?: SortOrder
    postedDate?: SortOrder
    postedBy?: SortOrder
    applicantsCount?: SortOrder
  }

  export type JobAvgOrderByAggregateInput = {
    salaryMin?: SortOrder
    salaryMax?: SortOrder
    applicantsCount?: SortOrder
  }

  export type JobMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    department?: SortOrder
    company?: SortOrder
    companyId?: SortOrder
    location?: SortOrder
    locationType?: SortOrder
    employmentType?: SortOrder
    experienceLevel?: SortOrder
    salaryMin?: SortOrder
    salaryMax?: SortOrder
    salaryCurrency?: SortOrder
    salaryPeriod?: SortOrder
    description?: SortOrder
    applicationDeadline?: SortOrder
    applicationUrl?: SortOrder
    postedDate?: SortOrder
    postedBy?: SortOrder
    applicantsCount?: SortOrder
  }

  export type JobMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    department?: SortOrder
    company?: SortOrder
    companyId?: SortOrder
    location?: SortOrder
    locationType?: SortOrder
    employmentType?: SortOrder
    experienceLevel?: SortOrder
    salaryMin?: SortOrder
    salaryMax?: SortOrder
    salaryCurrency?: SortOrder
    salaryPeriod?: SortOrder
    description?: SortOrder
    applicationDeadline?: SortOrder
    applicationUrl?: SortOrder
    postedDate?: SortOrder
    postedBy?: SortOrder
    applicantsCount?: SortOrder
  }

  export type JobSumOrderByAggregateInput = {
    salaryMin?: SortOrder
    salaryMax?: SortOrder
    applicantsCount?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
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
    isSet?: boolean
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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

  export type JobScalarRelationFilter = {
    is?: JobWhereInput
    isNot?: JobWhereInput
  }

  export type JobSeekerScalarRelationFilter = {
    is?: JobSeekerWhereInput
    isNot?: JobSeekerWhereInput
  }

  export type JobApplicationCountOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    jobSeekerId?: SortOrder
    recruiterId?: SortOrder
    resumeUrl?: SortOrder
    coverLetter?: SortOrder
    expectedSalary?: SortOrder
    noticePeriod?: SortOrder
    availabilityDate?: SortOrder
    status?: SortOrder
    appliedDate?: SortOrder
    reviewedDate?: SortOrder
    notes?: SortOrder
    portfolioUrl?: SortOrder
    linkedinUrl?: SortOrder
    githubUrl?: SortOrder
    additionalNotes?: SortOrder
  }

  export type JobApplicationMaxOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    jobSeekerId?: SortOrder
    recruiterId?: SortOrder
    resumeUrl?: SortOrder
    coverLetter?: SortOrder
    expectedSalary?: SortOrder
    noticePeriod?: SortOrder
    availabilityDate?: SortOrder
    status?: SortOrder
    appliedDate?: SortOrder
    reviewedDate?: SortOrder
    notes?: SortOrder
    portfolioUrl?: SortOrder
    linkedinUrl?: SortOrder
    githubUrl?: SortOrder
    additionalNotes?: SortOrder
  }

  export type JobApplicationMinOrderByAggregateInput = {
    id?: SortOrder
    jobId?: SortOrder
    jobSeekerId?: SortOrder
    recruiterId?: SortOrder
    resumeUrl?: SortOrder
    coverLetter?: SortOrder
    expectedSalary?: SortOrder
    noticePeriod?: SortOrder
    availabilityDate?: SortOrder
    status?: SortOrder
    appliedDate?: SortOrder
    reviewedDate?: SortOrder
    notes?: SortOrder
    portfolioUrl?: SortOrder
    linkedinUrl?: SortOrder
    githubUrl?: SortOrder
    additionalNotes?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
  }

  export type ResumeCountOrderByAggregateInput = {
    id?: SortOrder
    jobSeekerId?: SortOrder
    name?: SortOrder
    template?: SortOrder
    data?: SortOrder
    lastModified?: SortOrder
    jobApplications?: SortOrder
    isActive?: SortOrder
  }

  export type ResumeAvgOrderByAggregateInput = {
    jobApplications?: SortOrder
  }

  export type ResumeMaxOrderByAggregateInput = {
    id?: SortOrder
    jobSeekerId?: SortOrder
    name?: SortOrder
    template?: SortOrder
    lastModified?: SortOrder
    jobApplications?: SortOrder
    isActive?: SortOrder
  }

  export type ResumeMinOrderByAggregateInput = {
    id?: SortOrder
    jobSeekerId?: SortOrder
    name?: SortOrder
    template?: SortOrder
    lastModified?: SortOrder
    jobApplications?: SortOrder
    isActive?: SortOrder
  }

  export type ResumeSumOrderByAggregateInput = {
    jobApplications?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type JobSeekerCreateskillsInput = {
    set: string[]
  }

  export type JobSeekerCreatepreferredJobTypesInput = {
    set: string[]
  }

  export type JobSeekerCreatelanguagesInput = {
    set: string[]
  }

  export type JobSeekerCreatecertificationsInput = {
    set: string[]
  }

  export type JobApplicationCreateNestedManyWithoutJobSeekerInput = {
    create?: XOR<JobApplicationCreateWithoutJobSeekerInput, JobApplicationUncheckedCreateWithoutJobSeekerInput> | JobApplicationCreateWithoutJobSeekerInput[] | JobApplicationUncheckedCreateWithoutJobSeekerInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutJobSeekerInput | JobApplicationCreateOrConnectWithoutJobSeekerInput[]
    createMany?: JobApplicationCreateManyJobSeekerInputEnvelope
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
  }

  export type ResumeCreateNestedManyWithoutJobSeekerInput = {
    create?: XOR<ResumeCreateWithoutJobSeekerInput, ResumeUncheckedCreateWithoutJobSeekerInput> | ResumeCreateWithoutJobSeekerInput[] | ResumeUncheckedCreateWithoutJobSeekerInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutJobSeekerInput | ResumeCreateOrConnectWithoutJobSeekerInput[]
    createMany?: ResumeCreateManyJobSeekerInputEnvelope
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
  }

  export type JobApplicationUncheckedCreateNestedManyWithoutJobSeekerInput = {
    create?: XOR<JobApplicationCreateWithoutJobSeekerInput, JobApplicationUncheckedCreateWithoutJobSeekerInput> | JobApplicationCreateWithoutJobSeekerInput[] | JobApplicationUncheckedCreateWithoutJobSeekerInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutJobSeekerInput | JobApplicationCreateOrConnectWithoutJobSeekerInput[]
    createMany?: JobApplicationCreateManyJobSeekerInputEnvelope
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
  }

  export type ResumeUncheckedCreateNestedManyWithoutJobSeekerInput = {
    create?: XOR<ResumeCreateWithoutJobSeekerInput, ResumeUncheckedCreateWithoutJobSeekerInput> | ResumeCreateWithoutJobSeekerInput[] | ResumeUncheckedCreateWithoutJobSeekerInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutJobSeekerInput | ResumeCreateOrConnectWithoutJobSeekerInput[]
    createMany?: ResumeCreateManyJobSeekerInputEnvelope
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type JobSeekerUpdateskillsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  export type JobSeekerUpdatepreferredJobTypesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type JobSeekerUpdatelanguagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type JobSeekerUpdatecertificationsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type JobApplicationUpdateManyWithoutJobSeekerNestedInput = {
    create?: XOR<JobApplicationCreateWithoutJobSeekerInput, JobApplicationUncheckedCreateWithoutJobSeekerInput> | JobApplicationCreateWithoutJobSeekerInput[] | JobApplicationUncheckedCreateWithoutJobSeekerInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutJobSeekerInput | JobApplicationCreateOrConnectWithoutJobSeekerInput[]
    upsert?: JobApplicationUpsertWithWhereUniqueWithoutJobSeekerInput | JobApplicationUpsertWithWhereUniqueWithoutJobSeekerInput[]
    createMany?: JobApplicationCreateManyJobSeekerInputEnvelope
    set?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    disconnect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    delete?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    update?: JobApplicationUpdateWithWhereUniqueWithoutJobSeekerInput | JobApplicationUpdateWithWhereUniqueWithoutJobSeekerInput[]
    updateMany?: JobApplicationUpdateManyWithWhereWithoutJobSeekerInput | JobApplicationUpdateManyWithWhereWithoutJobSeekerInput[]
    deleteMany?: JobApplicationScalarWhereInput | JobApplicationScalarWhereInput[]
  }

  export type ResumeUpdateManyWithoutJobSeekerNestedInput = {
    create?: XOR<ResumeCreateWithoutJobSeekerInput, ResumeUncheckedCreateWithoutJobSeekerInput> | ResumeCreateWithoutJobSeekerInput[] | ResumeUncheckedCreateWithoutJobSeekerInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutJobSeekerInput | ResumeCreateOrConnectWithoutJobSeekerInput[]
    upsert?: ResumeUpsertWithWhereUniqueWithoutJobSeekerInput | ResumeUpsertWithWhereUniqueWithoutJobSeekerInput[]
    createMany?: ResumeCreateManyJobSeekerInputEnvelope
    set?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    disconnect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    delete?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    update?: ResumeUpdateWithWhereUniqueWithoutJobSeekerInput | ResumeUpdateWithWhereUniqueWithoutJobSeekerInput[]
    updateMany?: ResumeUpdateManyWithWhereWithoutJobSeekerInput | ResumeUpdateManyWithWhereWithoutJobSeekerInput[]
    deleteMany?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
  }

  export type JobApplicationUncheckedUpdateManyWithoutJobSeekerNestedInput = {
    create?: XOR<JobApplicationCreateWithoutJobSeekerInput, JobApplicationUncheckedCreateWithoutJobSeekerInput> | JobApplicationCreateWithoutJobSeekerInput[] | JobApplicationUncheckedCreateWithoutJobSeekerInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutJobSeekerInput | JobApplicationCreateOrConnectWithoutJobSeekerInput[]
    upsert?: JobApplicationUpsertWithWhereUniqueWithoutJobSeekerInput | JobApplicationUpsertWithWhereUniqueWithoutJobSeekerInput[]
    createMany?: JobApplicationCreateManyJobSeekerInputEnvelope
    set?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    disconnect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    delete?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    update?: JobApplicationUpdateWithWhereUniqueWithoutJobSeekerInput | JobApplicationUpdateWithWhereUniqueWithoutJobSeekerInput[]
    updateMany?: JobApplicationUpdateManyWithWhereWithoutJobSeekerInput | JobApplicationUpdateManyWithWhereWithoutJobSeekerInput[]
    deleteMany?: JobApplicationScalarWhereInput | JobApplicationScalarWhereInput[]
  }

  export type ResumeUncheckedUpdateManyWithoutJobSeekerNestedInput = {
    create?: XOR<ResumeCreateWithoutJobSeekerInput, ResumeUncheckedCreateWithoutJobSeekerInput> | ResumeCreateWithoutJobSeekerInput[] | ResumeUncheckedCreateWithoutJobSeekerInput[]
    connectOrCreate?: ResumeCreateOrConnectWithoutJobSeekerInput | ResumeCreateOrConnectWithoutJobSeekerInput[]
    upsert?: ResumeUpsertWithWhereUniqueWithoutJobSeekerInput | ResumeUpsertWithWhereUniqueWithoutJobSeekerInput[]
    createMany?: ResumeCreateManyJobSeekerInputEnvelope
    set?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    disconnect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    delete?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    connect?: ResumeWhereUniqueInput | ResumeWhereUniqueInput[]
    update?: ResumeUpdateWithWhereUniqueWithoutJobSeekerInput | ResumeUpdateWithWhereUniqueWithoutJobSeekerInput[]
    updateMany?: ResumeUpdateManyWithWhereWithoutJobSeekerInput | ResumeUpdateManyWithWhereWithoutJobSeekerInput[]
    deleteMany?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
  }

  export type RecruiterCreatecompanyBenefitsInput = {
    set: string[]
  }

  export type RecruiterCreatehiringNeedsInput = {
    set: string[]
  }

  export type RecruiterCreatepreferredLocationsInput = {
    set: string[]
  }

  export type JobCreateNestedManyWithoutRecruiterInput = {
    create?: XOR<JobCreateWithoutRecruiterInput, JobUncheckedCreateWithoutRecruiterInput> | JobCreateWithoutRecruiterInput[] | JobUncheckedCreateWithoutRecruiterInput[]
    connectOrCreate?: JobCreateOrConnectWithoutRecruiterInput | JobCreateOrConnectWithoutRecruiterInput[]
    createMany?: JobCreateManyRecruiterInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type JobApplicationCreateNestedManyWithoutRecruiterInput = {
    create?: XOR<JobApplicationCreateWithoutRecruiterInput, JobApplicationUncheckedCreateWithoutRecruiterInput> | JobApplicationCreateWithoutRecruiterInput[] | JobApplicationUncheckedCreateWithoutRecruiterInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutRecruiterInput | JobApplicationCreateOrConnectWithoutRecruiterInput[]
    createMany?: JobApplicationCreateManyRecruiterInputEnvelope
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
  }

  export type JobUncheckedCreateNestedManyWithoutRecruiterInput = {
    create?: XOR<JobCreateWithoutRecruiterInput, JobUncheckedCreateWithoutRecruiterInput> | JobCreateWithoutRecruiterInput[] | JobUncheckedCreateWithoutRecruiterInput[]
    connectOrCreate?: JobCreateOrConnectWithoutRecruiterInput | JobCreateOrConnectWithoutRecruiterInput[]
    createMany?: JobCreateManyRecruiterInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type JobApplicationUncheckedCreateNestedManyWithoutRecruiterInput = {
    create?: XOR<JobApplicationCreateWithoutRecruiterInput, JobApplicationUncheckedCreateWithoutRecruiterInput> | JobApplicationCreateWithoutRecruiterInput[] | JobApplicationUncheckedCreateWithoutRecruiterInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutRecruiterInput | JobApplicationCreateOrConnectWithoutRecruiterInput[]
    createMany?: JobApplicationCreateManyRecruiterInputEnvelope
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
  }

  export type RecruiterUpdatecompanyBenefitsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type RecruiterUpdatehiringNeedsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type RecruiterUpdatepreferredLocationsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type JobUpdateManyWithoutRecruiterNestedInput = {
    create?: XOR<JobCreateWithoutRecruiterInput, JobUncheckedCreateWithoutRecruiterInput> | JobCreateWithoutRecruiterInput[] | JobUncheckedCreateWithoutRecruiterInput[]
    connectOrCreate?: JobCreateOrConnectWithoutRecruiterInput | JobCreateOrConnectWithoutRecruiterInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutRecruiterInput | JobUpsertWithWhereUniqueWithoutRecruiterInput[]
    createMany?: JobCreateManyRecruiterInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutRecruiterInput | JobUpdateWithWhereUniqueWithoutRecruiterInput[]
    updateMany?: JobUpdateManyWithWhereWithoutRecruiterInput | JobUpdateManyWithWhereWithoutRecruiterInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type JobApplicationUpdateManyWithoutRecruiterNestedInput = {
    create?: XOR<JobApplicationCreateWithoutRecruiterInput, JobApplicationUncheckedCreateWithoutRecruiterInput> | JobApplicationCreateWithoutRecruiterInput[] | JobApplicationUncheckedCreateWithoutRecruiterInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutRecruiterInput | JobApplicationCreateOrConnectWithoutRecruiterInput[]
    upsert?: JobApplicationUpsertWithWhereUniqueWithoutRecruiterInput | JobApplicationUpsertWithWhereUniqueWithoutRecruiterInput[]
    createMany?: JobApplicationCreateManyRecruiterInputEnvelope
    set?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    disconnect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    delete?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    update?: JobApplicationUpdateWithWhereUniqueWithoutRecruiterInput | JobApplicationUpdateWithWhereUniqueWithoutRecruiterInput[]
    updateMany?: JobApplicationUpdateManyWithWhereWithoutRecruiterInput | JobApplicationUpdateManyWithWhereWithoutRecruiterInput[]
    deleteMany?: JobApplicationScalarWhereInput | JobApplicationScalarWhereInput[]
  }

  export type JobUncheckedUpdateManyWithoutRecruiterNestedInput = {
    create?: XOR<JobCreateWithoutRecruiterInput, JobUncheckedCreateWithoutRecruiterInput> | JobCreateWithoutRecruiterInput[] | JobUncheckedCreateWithoutRecruiterInput[]
    connectOrCreate?: JobCreateOrConnectWithoutRecruiterInput | JobCreateOrConnectWithoutRecruiterInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutRecruiterInput | JobUpsertWithWhereUniqueWithoutRecruiterInput[]
    createMany?: JobCreateManyRecruiterInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutRecruiterInput | JobUpdateWithWhereUniqueWithoutRecruiterInput[]
    updateMany?: JobUpdateManyWithWhereWithoutRecruiterInput | JobUpdateManyWithWhereWithoutRecruiterInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type JobApplicationUncheckedUpdateManyWithoutRecruiterNestedInput = {
    create?: XOR<JobApplicationCreateWithoutRecruiterInput, JobApplicationUncheckedCreateWithoutRecruiterInput> | JobApplicationCreateWithoutRecruiterInput[] | JobApplicationUncheckedCreateWithoutRecruiterInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutRecruiterInput | JobApplicationCreateOrConnectWithoutRecruiterInput[]
    upsert?: JobApplicationUpsertWithWhereUniqueWithoutRecruiterInput | JobApplicationUpsertWithWhereUniqueWithoutRecruiterInput[]
    createMany?: JobApplicationCreateManyRecruiterInputEnvelope
    set?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    disconnect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    delete?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    update?: JobApplicationUpdateWithWhereUniqueWithoutRecruiterInput | JobApplicationUpdateWithWhereUniqueWithoutRecruiterInput[]
    updateMany?: JobApplicationUpdateManyWithWhereWithoutRecruiterInput | JobApplicationUpdateManyWithWhereWithoutRecruiterInput[]
    deleteMany?: JobApplicationScalarWhereInput | JobApplicationScalarWhereInput[]
  }

  export type JobCreateresponsibilitiesInput = {
    set: string[]
  }

  export type JobCreaterequirementsInput = {
    set: string[]
  }

  export type JobCreatebenefitsInput = {
    set: string[]
  }

  export type RecruiterCreateNestedOneWithoutJobsInput = {
    create?: XOR<RecruiterCreateWithoutJobsInput, RecruiterUncheckedCreateWithoutJobsInput>
    connectOrCreate?: RecruiterCreateOrConnectWithoutJobsInput
    connect?: RecruiterWhereUniqueInput
  }

  export type JobApplicationCreateNestedManyWithoutJobInput = {
    create?: XOR<JobApplicationCreateWithoutJobInput, JobApplicationUncheckedCreateWithoutJobInput> | JobApplicationCreateWithoutJobInput[] | JobApplicationUncheckedCreateWithoutJobInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutJobInput | JobApplicationCreateOrConnectWithoutJobInput[]
    createMany?: JobApplicationCreateManyJobInputEnvelope
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
  }

  export type JobApplicationUncheckedCreateNestedManyWithoutJobInput = {
    create?: XOR<JobApplicationCreateWithoutJobInput, JobApplicationUncheckedCreateWithoutJobInput> | JobApplicationCreateWithoutJobInput[] | JobApplicationUncheckedCreateWithoutJobInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutJobInput | JobApplicationCreateOrConnectWithoutJobInput[]
    createMany?: JobApplicationCreateManyJobInputEnvelope
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
    unset?: boolean
  }

  export type JobUpdateresponsibilitiesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type JobUpdaterequirementsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type JobUpdatebenefitsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type RecruiterUpdateOneRequiredWithoutJobsNestedInput = {
    create?: XOR<RecruiterCreateWithoutJobsInput, RecruiterUncheckedCreateWithoutJobsInput>
    connectOrCreate?: RecruiterCreateOrConnectWithoutJobsInput
    upsert?: RecruiterUpsertWithoutJobsInput
    connect?: RecruiterWhereUniqueInput
    update?: XOR<XOR<RecruiterUpdateToOneWithWhereWithoutJobsInput, RecruiterUpdateWithoutJobsInput>, RecruiterUncheckedUpdateWithoutJobsInput>
  }

  export type JobApplicationUpdateManyWithoutJobNestedInput = {
    create?: XOR<JobApplicationCreateWithoutJobInput, JobApplicationUncheckedCreateWithoutJobInput> | JobApplicationCreateWithoutJobInput[] | JobApplicationUncheckedCreateWithoutJobInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutJobInput | JobApplicationCreateOrConnectWithoutJobInput[]
    upsert?: JobApplicationUpsertWithWhereUniqueWithoutJobInput | JobApplicationUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: JobApplicationCreateManyJobInputEnvelope
    set?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    disconnect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    delete?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    update?: JobApplicationUpdateWithWhereUniqueWithoutJobInput | JobApplicationUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: JobApplicationUpdateManyWithWhereWithoutJobInput | JobApplicationUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: JobApplicationScalarWhereInput | JobApplicationScalarWhereInput[]
  }

  export type JobApplicationUncheckedUpdateManyWithoutJobNestedInput = {
    create?: XOR<JobApplicationCreateWithoutJobInput, JobApplicationUncheckedCreateWithoutJobInput> | JobApplicationCreateWithoutJobInput[] | JobApplicationUncheckedCreateWithoutJobInput[]
    connectOrCreate?: JobApplicationCreateOrConnectWithoutJobInput | JobApplicationCreateOrConnectWithoutJobInput[]
    upsert?: JobApplicationUpsertWithWhereUniqueWithoutJobInput | JobApplicationUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: JobApplicationCreateManyJobInputEnvelope
    set?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    disconnect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    delete?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    connect?: JobApplicationWhereUniqueInput | JobApplicationWhereUniqueInput[]
    update?: JobApplicationUpdateWithWhereUniqueWithoutJobInput | JobApplicationUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: JobApplicationUpdateManyWithWhereWithoutJobInput | JobApplicationUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: JobApplicationScalarWhereInput | JobApplicationScalarWhereInput[]
  }

  export type JobCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<JobCreateWithoutApplicationsInput, JobUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: JobCreateOrConnectWithoutApplicationsInput
    connect?: JobWhereUniqueInput
  }

  export type JobSeekerCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<JobSeekerCreateWithoutApplicationsInput, JobSeekerUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: JobSeekerCreateOrConnectWithoutApplicationsInput
    connect?: JobSeekerWhereUniqueInput
  }

  export type RecruiterCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<RecruiterCreateWithoutApplicationsInput, RecruiterUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: RecruiterCreateOrConnectWithoutApplicationsInput
    connect?: RecruiterWhereUniqueInput
  }

  export type JobUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<JobCreateWithoutApplicationsInput, JobUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: JobCreateOrConnectWithoutApplicationsInput
    upsert?: JobUpsertWithoutApplicationsInput
    connect?: JobWhereUniqueInput
    update?: XOR<XOR<JobUpdateToOneWithWhereWithoutApplicationsInput, JobUpdateWithoutApplicationsInput>, JobUncheckedUpdateWithoutApplicationsInput>
  }

  export type JobSeekerUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<JobSeekerCreateWithoutApplicationsInput, JobSeekerUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: JobSeekerCreateOrConnectWithoutApplicationsInput
    upsert?: JobSeekerUpsertWithoutApplicationsInput
    connect?: JobSeekerWhereUniqueInput
    update?: XOR<XOR<JobSeekerUpdateToOneWithWhereWithoutApplicationsInput, JobSeekerUpdateWithoutApplicationsInput>, JobSeekerUncheckedUpdateWithoutApplicationsInput>
  }

  export type RecruiterUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<RecruiterCreateWithoutApplicationsInput, RecruiterUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: RecruiterCreateOrConnectWithoutApplicationsInput
    upsert?: RecruiterUpsertWithoutApplicationsInput
    connect?: RecruiterWhereUniqueInput
    update?: XOR<XOR<RecruiterUpdateToOneWithWhereWithoutApplicationsInput, RecruiterUpdateWithoutApplicationsInput>, RecruiterUncheckedUpdateWithoutApplicationsInput>
  }

  export type JobSeekerCreateNestedOneWithoutResumesInput = {
    create?: XOR<JobSeekerCreateWithoutResumesInput, JobSeekerUncheckedCreateWithoutResumesInput>
    connectOrCreate?: JobSeekerCreateOrConnectWithoutResumesInput
    connect?: JobSeekerWhereUniqueInput
  }

  export type JobSeekerUpdateOneRequiredWithoutResumesNestedInput = {
    create?: XOR<JobSeekerCreateWithoutResumesInput, JobSeekerUncheckedCreateWithoutResumesInput>
    connectOrCreate?: JobSeekerCreateOrConnectWithoutResumesInput
    upsert?: JobSeekerUpsertWithoutResumesInput
    connect?: JobSeekerWhereUniqueInput
    update?: XOR<XOR<JobSeekerUpdateToOneWithWhereWithoutResumesInput, JobSeekerUpdateWithoutResumesInput>, JobSeekerUncheckedUpdateWithoutResumesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
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
    isSet?: boolean
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
  }

  export type JobApplicationCreateWithoutJobSeekerInput = {
    id?: string
    resumeUrl?: string | null
    coverLetter?: string | null
    expectedSalary?: string | null
    noticePeriod?: string | null
    availabilityDate?: string | null
    status?: string
    appliedDate?: Date | string
    reviewedDate?: Date | string | null
    notes?: string | null
    portfolioUrl?: string | null
    linkedinUrl?: string | null
    githubUrl?: string | null
    additionalNotes?: string | null
    job: JobCreateNestedOneWithoutApplicationsInput
    recruiter: RecruiterCreateNestedOneWithoutApplicationsInput
  }

  export type JobApplicationUncheckedCreateWithoutJobSeekerInput = {
    id?: string
    jobId: string
    recruiterId: string
    resumeUrl?: string | null
    coverLetter?: string | null
    expectedSalary?: string | null
    noticePeriod?: string | null
    availabilityDate?: string | null
    status?: string
    appliedDate?: Date | string
    reviewedDate?: Date | string | null
    notes?: string | null
    portfolioUrl?: string | null
    linkedinUrl?: string | null
    githubUrl?: string | null
    additionalNotes?: string | null
  }

  export type JobApplicationCreateOrConnectWithoutJobSeekerInput = {
    where: JobApplicationWhereUniqueInput
    create: XOR<JobApplicationCreateWithoutJobSeekerInput, JobApplicationUncheckedCreateWithoutJobSeekerInput>
  }

  export type JobApplicationCreateManyJobSeekerInputEnvelope = {
    data: JobApplicationCreateManyJobSeekerInput | JobApplicationCreateManyJobSeekerInput[]
  }

  export type ResumeCreateWithoutJobSeekerInput = {
    id?: string
    name: string
    template: string
    data: InputJsonValue
    lastModified?: Date | string
    jobApplications?: number
    isActive?: boolean
  }

  export type ResumeUncheckedCreateWithoutJobSeekerInput = {
    id?: string
    name: string
    template: string
    data: InputJsonValue
    lastModified?: Date | string
    jobApplications?: number
    isActive?: boolean
  }

  export type ResumeCreateOrConnectWithoutJobSeekerInput = {
    where: ResumeWhereUniqueInput
    create: XOR<ResumeCreateWithoutJobSeekerInput, ResumeUncheckedCreateWithoutJobSeekerInput>
  }

  export type ResumeCreateManyJobSeekerInputEnvelope = {
    data: ResumeCreateManyJobSeekerInput | ResumeCreateManyJobSeekerInput[]
  }

  export type JobApplicationUpsertWithWhereUniqueWithoutJobSeekerInput = {
    where: JobApplicationWhereUniqueInput
    update: XOR<JobApplicationUpdateWithoutJobSeekerInput, JobApplicationUncheckedUpdateWithoutJobSeekerInput>
    create: XOR<JobApplicationCreateWithoutJobSeekerInput, JobApplicationUncheckedCreateWithoutJobSeekerInput>
  }

  export type JobApplicationUpdateWithWhereUniqueWithoutJobSeekerInput = {
    where: JobApplicationWhereUniqueInput
    data: XOR<JobApplicationUpdateWithoutJobSeekerInput, JobApplicationUncheckedUpdateWithoutJobSeekerInput>
  }

  export type JobApplicationUpdateManyWithWhereWithoutJobSeekerInput = {
    where: JobApplicationScalarWhereInput
    data: XOR<JobApplicationUpdateManyMutationInput, JobApplicationUncheckedUpdateManyWithoutJobSeekerInput>
  }

  export type JobApplicationScalarWhereInput = {
    AND?: JobApplicationScalarWhereInput | JobApplicationScalarWhereInput[]
    OR?: JobApplicationScalarWhereInput[]
    NOT?: JobApplicationScalarWhereInput | JobApplicationScalarWhereInput[]
    id?: StringFilter<"JobApplication"> | string
    jobId?: StringFilter<"JobApplication"> | string
    jobSeekerId?: StringFilter<"JobApplication"> | string
    recruiterId?: StringFilter<"JobApplication"> | string
    resumeUrl?: StringNullableFilter<"JobApplication"> | string | null
    coverLetter?: StringNullableFilter<"JobApplication"> | string | null
    expectedSalary?: StringNullableFilter<"JobApplication"> | string | null
    noticePeriod?: StringNullableFilter<"JobApplication"> | string | null
    availabilityDate?: StringNullableFilter<"JobApplication"> | string | null
    status?: StringFilter<"JobApplication"> | string
    appliedDate?: DateTimeFilter<"JobApplication"> | Date | string
    reviewedDate?: DateTimeNullableFilter<"JobApplication"> | Date | string | null
    notes?: StringNullableFilter<"JobApplication"> | string | null
    portfolioUrl?: StringNullableFilter<"JobApplication"> | string | null
    linkedinUrl?: StringNullableFilter<"JobApplication"> | string | null
    githubUrl?: StringNullableFilter<"JobApplication"> | string | null
    additionalNotes?: StringNullableFilter<"JobApplication"> | string | null
  }

  export type ResumeUpsertWithWhereUniqueWithoutJobSeekerInput = {
    where: ResumeWhereUniqueInput
    update: XOR<ResumeUpdateWithoutJobSeekerInput, ResumeUncheckedUpdateWithoutJobSeekerInput>
    create: XOR<ResumeCreateWithoutJobSeekerInput, ResumeUncheckedCreateWithoutJobSeekerInput>
  }

  export type ResumeUpdateWithWhereUniqueWithoutJobSeekerInput = {
    where: ResumeWhereUniqueInput
    data: XOR<ResumeUpdateWithoutJobSeekerInput, ResumeUncheckedUpdateWithoutJobSeekerInput>
  }

  export type ResumeUpdateManyWithWhereWithoutJobSeekerInput = {
    where: ResumeScalarWhereInput
    data: XOR<ResumeUpdateManyMutationInput, ResumeUncheckedUpdateManyWithoutJobSeekerInput>
  }

  export type ResumeScalarWhereInput = {
    AND?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
    OR?: ResumeScalarWhereInput[]
    NOT?: ResumeScalarWhereInput | ResumeScalarWhereInput[]
    id?: StringFilter<"Resume"> | string
    jobSeekerId?: StringFilter<"Resume"> | string
    name?: StringFilter<"Resume"> | string
    template?: StringFilter<"Resume"> | string
    data?: JsonFilter<"Resume">
    lastModified?: DateTimeFilter<"Resume"> | Date | string
    jobApplications?: IntFilter<"Resume"> | number
    isActive?: BoolFilter<"Resume"> | boolean
  }

  export type JobCreateWithoutRecruiterInput = {
    id?: string
    title: string
    department?: string | null
    company: string
    companyId?: string | null
    location: string
    locationType: string
    employmentType: string
    experienceLevel?: string | null
    salaryMin?: number | null
    salaryMax?: number | null
    salaryCurrency?: string | null
    salaryPeriod?: string | null
    description: string
    responsibilities?: JobCreateresponsibilitiesInput | string[]
    requirements?: JobCreaterequirementsInput | string[]
    benefits?: JobCreatebenefitsInput | string[]
    applicationDeadline?: string | null
    applicationUrl?: string | null
    postedDate?: Date | string
    applicantsCount?: number
    applications?: JobApplicationCreateNestedManyWithoutJobInput
  }

  export type JobUncheckedCreateWithoutRecruiterInput = {
    id?: string
    title: string
    department?: string | null
    company: string
    companyId?: string | null
    location: string
    locationType: string
    employmentType: string
    experienceLevel?: string | null
    salaryMin?: number | null
    salaryMax?: number | null
    salaryCurrency?: string | null
    salaryPeriod?: string | null
    description: string
    responsibilities?: JobCreateresponsibilitiesInput | string[]
    requirements?: JobCreaterequirementsInput | string[]
    benefits?: JobCreatebenefitsInput | string[]
    applicationDeadline?: string | null
    applicationUrl?: string | null
    postedDate?: Date | string
    applicantsCount?: number
    applications?: JobApplicationUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobCreateOrConnectWithoutRecruiterInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutRecruiterInput, JobUncheckedCreateWithoutRecruiterInput>
  }

  export type JobCreateManyRecruiterInputEnvelope = {
    data: JobCreateManyRecruiterInput | JobCreateManyRecruiterInput[]
  }

  export type JobApplicationCreateWithoutRecruiterInput = {
    id?: string
    resumeUrl?: string | null
    coverLetter?: string | null
    expectedSalary?: string | null
    noticePeriod?: string | null
    availabilityDate?: string | null
    status?: string
    appliedDate?: Date | string
    reviewedDate?: Date | string | null
    notes?: string | null
    portfolioUrl?: string | null
    linkedinUrl?: string | null
    githubUrl?: string | null
    additionalNotes?: string | null
    job: JobCreateNestedOneWithoutApplicationsInput
    jobSeeker: JobSeekerCreateNestedOneWithoutApplicationsInput
  }

  export type JobApplicationUncheckedCreateWithoutRecruiterInput = {
    id?: string
    jobId: string
    jobSeekerId: string
    resumeUrl?: string | null
    coverLetter?: string | null
    expectedSalary?: string | null
    noticePeriod?: string | null
    availabilityDate?: string | null
    status?: string
    appliedDate?: Date | string
    reviewedDate?: Date | string | null
    notes?: string | null
    portfolioUrl?: string | null
    linkedinUrl?: string | null
    githubUrl?: string | null
    additionalNotes?: string | null
  }

  export type JobApplicationCreateOrConnectWithoutRecruiterInput = {
    where: JobApplicationWhereUniqueInput
    create: XOR<JobApplicationCreateWithoutRecruiterInput, JobApplicationUncheckedCreateWithoutRecruiterInput>
  }

  export type JobApplicationCreateManyRecruiterInputEnvelope = {
    data: JobApplicationCreateManyRecruiterInput | JobApplicationCreateManyRecruiterInput[]
  }

  export type JobUpsertWithWhereUniqueWithoutRecruiterInput = {
    where: JobWhereUniqueInput
    update: XOR<JobUpdateWithoutRecruiterInput, JobUncheckedUpdateWithoutRecruiterInput>
    create: XOR<JobCreateWithoutRecruiterInput, JobUncheckedCreateWithoutRecruiterInput>
  }

  export type JobUpdateWithWhereUniqueWithoutRecruiterInput = {
    where: JobWhereUniqueInput
    data: XOR<JobUpdateWithoutRecruiterInput, JobUncheckedUpdateWithoutRecruiterInput>
  }

  export type JobUpdateManyWithWhereWithoutRecruiterInput = {
    where: JobScalarWhereInput
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyWithoutRecruiterInput>
  }

  export type JobScalarWhereInput = {
    AND?: JobScalarWhereInput | JobScalarWhereInput[]
    OR?: JobScalarWhereInput[]
    NOT?: JobScalarWhereInput | JobScalarWhereInput[]
    id?: StringFilter<"Job"> | string
    title?: StringFilter<"Job"> | string
    department?: StringNullableFilter<"Job"> | string | null
    company?: StringFilter<"Job"> | string
    companyId?: StringNullableFilter<"Job"> | string | null
    location?: StringFilter<"Job"> | string
    locationType?: StringFilter<"Job"> | string
    employmentType?: StringFilter<"Job"> | string
    experienceLevel?: StringNullableFilter<"Job"> | string | null
    salaryMin?: IntNullableFilter<"Job"> | number | null
    salaryMax?: IntNullableFilter<"Job"> | number | null
    salaryCurrency?: StringNullableFilter<"Job"> | string | null
    salaryPeriod?: StringNullableFilter<"Job"> | string | null
    description?: StringFilter<"Job"> | string
    responsibilities?: StringNullableListFilter<"Job">
    requirements?: StringNullableListFilter<"Job">
    benefits?: StringNullableListFilter<"Job">
    applicationDeadline?: StringNullableFilter<"Job"> | string | null
    applicationUrl?: StringNullableFilter<"Job"> | string | null
    postedDate?: DateTimeFilter<"Job"> | Date | string
    postedBy?: StringFilter<"Job"> | string
    applicantsCount?: IntFilter<"Job"> | number
  }

  export type JobApplicationUpsertWithWhereUniqueWithoutRecruiterInput = {
    where: JobApplicationWhereUniqueInput
    update: XOR<JobApplicationUpdateWithoutRecruiterInput, JobApplicationUncheckedUpdateWithoutRecruiterInput>
    create: XOR<JobApplicationCreateWithoutRecruiterInput, JobApplicationUncheckedCreateWithoutRecruiterInput>
  }

  export type JobApplicationUpdateWithWhereUniqueWithoutRecruiterInput = {
    where: JobApplicationWhereUniqueInput
    data: XOR<JobApplicationUpdateWithoutRecruiterInput, JobApplicationUncheckedUpdateWithoutRecruiterInput>
  }

  export type JobApplicationUpdateManyWithWhereWithoutRecruiterInput = {
    where: JobApplicationScalarWhereInput
    data: XOR<JobApplicationUpdateManyMutationInput, JobApplicationUncheckedUpdateManyWithoutRecruiterInput>
  }

  export type RecruiterCreateWithoutJobsInput = {
    id?: string
    email: string
    password?: string | null
    companyName: string
    fullName: string
    phone?: string | null
    position?: string | null
    companySize?: string | null
    industry?: string | null
    website?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    lastLogin?: Date | string | null
    profileComplete?: boolean
    emailVerified?: boolean
    phoneVerified?: boolean
    bio?: string | null
    linkedinUrl?: string | null
    companyDescription?: string | null
    companyLogo?: string | null
    companyBenefits?: RecruiterCreatecompanyBenefitsInput | string[]
    hiringNeeds?: RecruiterCreatehiringNeedsInput | string[]
    preferredLocations?: RecruiterCreatepreferredLocationsInput | string[]
    applications?: JobApplicationCreateNestedManyWithoutRecruiterInput
  }

  export type RecruiterUncheckedCreateWithoutJobsInput = {
    id?: string
    email: string
    password?: string | null
    companyName: string
    fullName: string
    phone?: string | null
    position?: string | null
    companySize?: string | null
    industry?: string | null
    website?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    lastLogin?: Date | string | null
    profileComplete?: boolean
    emailVerified?: boolean
    phoneVerified?: boolean
    bio?: string | null
    linkedinUrl?: string | null
    companyDescription?: string | null
    companyLogo?: string | null
    companyBenefits?: RecruiterCreatecompanyBenefitsInput | string[]
    hiringNeeds?: RecruiterCreatehiringNeedsInput | string[]
    preferredLocations?: RecruiterCreatepreferredLocationsInput | string[]
    applications?: JobApplicationUncheckedCreateNestedManyWithoutRecruiterInput
  }

  export type RecruiterCreateOrConnectWithoutJobsInput = {
    where: RecruiterWhereUniqueInput
    create: XOR<RecruiterCreateWithoutJobsInput, RecruiterUncheckedCreateWithoutJobsInput>
  }

  export type JobApplicationCreateWithoutJobInput = {
    id?: string
    resumeUrl?: string | null
    coverLetter?: string | null
    expectedSalary?: string | null
    noticePeriod?: string | null
    availabilityDate?: string | null
    status?: string
    appliedDate?: Date | string
    reviewedDate?: Date | string | null
    notes?: string | null
    portfolioUrl?: string | null
    linkedinUrl?: string | null
    githubUrl?: string | null
    additionalNotes?: string | null
    jobSeeker: JobSeekerCreateNestedOneWithoutApplicationsInput
    recruiter: RecruiterCreateNestedOneWithoutApplicationsInput
  }

  export type JobApplicationUncheckedCreateWithoutJobInput = {
    id?: string
    jobSeekerId: string
    recruiterId: string
    resumeUrl?: string | null
    coverLetter?: string | null
    expectedSalary?: string | null
    noticePeriod?: string | null
    availabilityDate?: string | null
    status?: string
    appliedDate?: Date | string
    reviewedDate?: Date | string | null
    notes?: string | null
    portfolioUrl?: string | null
    linkedinUrl?: string | null
    githubUrl?: string | null
    additionalNotes?: string | null
  }

  export type JobApplicationCreateOrConnectWithoutJobInput = {
    where: JobApplicationWhereUniqueInput
    create: XOR<JobApplicationCreateWithoutJobInput, JobApplicationUncheckedCreateWithoutJobInput>
  }

  export type JobApplicationCreateManyJobInputEnvelope = {
    data: JobApplicationCreateManyJobInput | JobApplicationCreateManyJobInput[]
  }

  export type RecruiterUpsertWithoutJobsInput = {
    update: XOR<RecruiterUpdateWithoutJobsInput, RecruiterUncheckedUpdateWithoutJobsInput>
    create: XOR<RecruiterCreateWithoutJobsInput, RecruiterUncheckedCreateWithoutJobsInput>
    where?: RecruiterWhereInput
  }

  export type RecruiterUpdateToOneWithWhereWithoutJobsInput = {
    where?: RecruiterWhereInput
    data: XOR<RecruiterUpdateWithoutJobsInput, RecruiterUncheckedUpdateWithoutJobsInput>
  }

  export type RecruiterUpdateWithoutJobsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    companyLogo?: NullableStringFieldUpdateOperationsInput | string | null
    companyBenefits?: RecruiterUpdatecompanyBenefitsInput | string[]
    hiringNeeds?: RecruiterUpdatehiringNeedsInput | string[]
    preferredLocations?: RecruiterUpdatepreferredLocationsInput | string[]
    applications?: JobApplicationUpdateManyWithoutRecruiterNestedInput
  }

  export type RecruiterUncheckedUpdateWithoutJobsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    companyLogo?: NullableStringFieldUpdateOperationsInput | string | null
    companyBenefits?: RecruiterUpdatecompanyBenefitsInput | string[]
    hiringNeeds?: RecruiterUpdatehiringNeedsInput | string[]
    preferredLocations?: RecruiterUpdatepreferredLocationsInput | string[]
    applications?: JobApplicationUncheckedUpdateManyWithoutRecruiterNestedInput
  }

  export type JobApplicationUpsertWithWhereUniqueWithoutJobInput = {
    where: JobApplicationWhereUniqueInput
    update: XOR<JobApplicationUpdateWithoutJobInput, JobApplicationUncheckedUpdateWithoutJobInput>
    create: XOR<JobApplicationCreateWithoutJobInput, JobApplicationUncheckedCreateWithoutJobInput>
  }

  export type JobApplicationUpdateWithWhereUniqueWithoutJobInput = {
    where: JobApplicationWhereUniqueInput
    data: XOR<JobApplicationUpdateWithoutJobInput, JobApplicationUncheckedUpdateWithoutJobInput>
  }

  export type JobApplicationUpdateManyWithWhereWithoutJobInput = {
    where: JobApplicationScalarWhereInput
    data: XOR<JobApplicationUpdateManyMutationInput, JobApplicationUncheckedUpdateManyWithoutJobInput>
  }

  export type JobCreateWithoutApplicationsInput = {
    id?: string
    title: string
    department?: string | null
    company: string
    companyId?: string | null
    location: string
    locationType: string
    employmentType: string
    experienceLevel?: string | null
    salaryMin?: number | null
    salaryMax?: number | null
    salaryCurrency?: string | null
    salaryPeriod?: string | null
    description: string
    responsibilities?: JobCreateresponsibilitiesInput | string[]
    requirements?: JobCreaterequirementsInput | string[]
    benefits?: JobCreatebenefitsInput | string[]
    applicationDeadline?: string | null
    applicationUrl?: string | null
    postedDate?: Date | string
    applicantsCount?: number
    recruiter: RecruiterCreateNestedOneWithoutJobsInput
  }

  export type JobUncheckedCreateWithoutApplicationsInput = {
    id?: string
    title: string
    department?: string | null
    company: string
    companyId?: string | null
    location: string
    locationType: string
    employmentType: string
    experienceLevel?: string | null
    salaryMin?: number | null
    salaryMax?: number | null
    salaryCurrency?: string | null
    salaryPeriod?: string | null
    description: string
    responsibilities?: JobCreateresponsibilitiesInput | string[]
    requirements?: JobCreaterequirementsInput | string[]
    benefits?: JobCreatebenefitsInput | string[]
    applicationDeadline?: string | null
    applicationUrl?: string | null
    postedDate?: Date | string
    postedBy: string
    applicantsCount?: number
  }

  export type JobCreateOrConnectWithoutApplicationsInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutApplicationsInput, JobUncheckedCreateWithoutApplicationsInput>
  }

  export type JobSeekerCreateWithoutApplicationsInput = {
    id?: string
    email: string
    password?: string | null
    fullName: string
    phone?: string | null
    currentJobTitle?: string | null
    yearsOfExperience?: string | null
    education?: string | null
    skills?: JobSeekerCreateskillsInput | string[]
    resume?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    lastLogin?: Date | string | null
    profileComplete?: boolean
    emailVerified?: boolean
    phoneVerified?: boolean
    bio?: string | null
    linkedinUrl?: string | null
    githubUrl?: string | null
    portfolioUrl?: string | null
    preferredJobTypes?: JobSeekerCreatepreferredJobTypesInput | string[]
    expectedSalary?: string | null
    noticePeriod?: string | null
    languages?: JobSeekerCreatelanguagesInput | string[]
    certifications?: JobSeekerCreatecertificationsInput | string[]
    resumes?: ResumeCreateNestedManyWithoutJobSeekerInput
  }

  export type JobSeekerUncheckedCreateWithoutApplicationsInput = {
    id?: string
    email: string
    password?: string | null
    fullName: string
    phone?: string | null
    currentJobTitle?: string | null
    yearsOfExperience?: string | null
    education?: string | null
    skills?: JobSeekerCreateskillsInput | string[]
    resume?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    lastLogin?: Date | string | null
    profileComplete?: boolean
    emailVerified?: boolean
    phoneVerified?: boolean
    bio?: string | null
    linkedinUrl?: string | null
    githubUrl?: string | null
    portfolioUrl?: string | null
    preferredJobTypes?: JobSeekerCreatepreferredJobTypesInput | string[]
    expectedSalary?: string | null
    noticePeriod?: string | null
    languages?: JobSeekerCreatelanguagesInput | string[]
    certifications?: JobSeekerCreatecertificationsInput | string[]
    resumes?: ResumeUncheckedCreateNestedManyWithoutJobSeekerInput
  }

  export type JobSeekerCreateOrConnectWithoutApplicationsInput = {
    where: JobSeekerWhereUniqueInput
    create: XOR<JobSeekerCreateWithoutApplicationsInput, JobSeekerUncheckedCreateWithoutApplicationsInput>
  }

  export type RecruiterCreateWithoutApplicationsInput = {
    id?: string
    email: string
    password?: string | null
    companyName: string
    fullName: string
    phone?: string | null
    position?: string | null
    companySize?: string | null
    industry?: string | null
    website?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    lastLogin?: Date | string | null
    profileComplete?: boolean
    emailVerified?: boolean
    phoneVerified?: boolean
    bio?: string | null
    linkedinUrl?: string | null
    companyDescription?: string | null
    companyLogo?: string | null
    companyBenefits?: RecruiterCreatecompanyBenefitsInput | string[]
    hiringNeeds?: RecruiterCreatehiringNeedsInput | string[]
    preferredLocations?: RecruiterCreatepreferredLocationsInput | string[]
    jobs?: JobCreateNestedManyWithoutRecruiterInput
  }

  export type RecruiterUncheckedCreateWithoutApplicationsInput = {
    id?: string
    email: string
    password?: string | null
    companyName: string
    fullName: string
    phone?: string | null
    position?: string | null
    companySize?: string | null
    industry?: string | null
    website?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    lastLogin?: Date | string | null
    profileComplete?: boolean
    emailVerified?: boolean
    phoneVerified?: boolean
    bio?: string | null
    linkedinUrl?: string | null
    companyDescription?: string | null
    companyLogo?: string | null
    companyBenefits?: RecruiterCreatecompanyBenefitsInput | string[]
    hiringNeeds?: RecruiterCreatehiringNeedsInput | string[]
    preferredLocations?: RecruiterCreatepreferredLocationsInput | string[]
    jobs?: JobUncheckedCreateNestedManyWithoutRecruiterInput
  }

  export type RecruiterCreateOrConnectWithoutApplicationsInput = {
    where: RecruiterWhereUniqueInput
    create: XOR<RecruiterCreateWithoutApplicationsInput, RecruiterUncheckedCreateWithoutApplicationsInput>
  }

  export type JobUpsertWithoutApplicationsInput = {
    update: XOR<JobUpdateWithoutApplicationsInput, JobUncheckedUpdateWithoutApplicationsInput>
    create: XOR<JobCreateWithoutApplicationsInput, JobUncheckedCreateWithoutApplicationsInput>
    where?: JobWhereInput
  }

  export type JobUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: JobWhereInput
    data: XOR<JobUpdateWithoutApplicationsInput, JobUncheckedUpdateWithoutApplicationsInput>
  }

  export type JobUpdateWithoutApplicationsInput = {
    title?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    company?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    location?: StringFieldUpdateOperationsInput | string
    locationType?: StringFieldUpdateOperationsInput | string
    employmentType?: StringFieldUpdateOperationsInput | string
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    salaryMin?: NullableIntFieldUpdateOperationsInput | number | null
    salaryMax?: NullableIntFieldUpdateOperationsInput | number | null
    salaryCurrency?: NullableStringFieldUpdateOperationsInput | string | null
    salaryPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    responsibilities?: JobUpdateresponsibilitiesInput | string[]
    requirements?: JobUpdaterequirementsInput | string[]
    benefits?: JobUpdatebenefitsInput | string[]
    applicationDeadline?: NullableStringFieldUpdateOperationsInput | string | null
    applicationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    applicantsCount?: IntFieldUpdateOperationsInput | number
    recruiter?: RecruiterUpdateOneRequiredWithoutJobsNestedInput
  }

  export type JobUncheckedUpdateWithoutApplicationsInput = {
    title?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    company?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    location?: StringFieldUpdateOperationsInput | string
    locationType?: StringFieldUpdateOperationsInput | string
    employmentType?: StringFieldUpdateOperationsInput | string
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    salaryMin?: NullableIntFieldUpdateOperationsInput | number | null
    salaryMax?: NullableIntFieldUpdateOperationsInput | number | null
    salaryCurrency?: NullableStringFieldUpdateOperationsInput | string | null
    salaryPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    responsibilities?: JobUpdateresponsibilitiesInput | string[]
    requirements?: JobUpdaterequirementsInput | string[]
    benefits?: JobUpdatebenefitsInput | string[]
    applicationDeadline?: NullableStringFieldUpdateOperationsInput | string | null
    applicationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    postedBy?: StringFieldUpdateOperationsInput | string
    applicantsCount?: IntFieldUpdateOperationsInput | number
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
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    currentJobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    yearsOfExperience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JobSeekerUpdateskillsInput | string[]
    resume?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    preferredJobTypes?: JobSeekerUpdatepreferredJobTypesInput | string[]
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    noticePeriod?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: JobSeekerUpdatelanguagesInput | string[]
    certifications?: JobSeekerUpdatecertificationsInput | string[]
    resumes?: ResumeUpdateManyWithoutJobSeekerNestedInput
  }

  export type JobSeekerUncheckedUpdateWithoutApplicationsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    currentJobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    yearsOfExperience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JobSeekerUpdateskillsInput | string[]
    resume?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    preferredJobTypes?: JobSeekerUpdatepreferredJobTypesInput | string[]
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    noticePeriod?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: JobSeekerUpdatelanguagesInput | string[]
    certifications?: JobSeekerUpdatecertificationsInput | string[]
    resumes?: ResumeUncheckedUpdateManyWithoutJobSeekerNestedInput
  }

  export type RecruiterUpsertWithoutApplicationsInput = {
    update: XOR<RecruiterUpdateWithoutApplicationsInput, RecruiterUncheckedUpdateWithoutApplicationsInput>
    create: XOR<RecruiterCreateWithoutApplicationsInput, RecruiterUncheckedCreateWithoutApplicationsInput>
    where?: RecruiterWhereInput
  }

  export type RecruiterUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: RecruiterWhereInput
    data: XOR<RecruiterUpdateWithoutApplicationsInput, RecruiterUncheckedUpdateWithoutApplicationsInput>
  }

  export type RecruiterUpdateWithoutApplicationsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    companyLogo?: NullableStringFieldUpdateOperationsInput | string | null
    companyBenefits?: RecruiterUpdatecompanyBenefitsInput | string[]
    hiringNeeds?: RecruiterUpdatehiringNeedsInput | string[]
    preferredLocations?: RecruiterUpdatepreferredLocationsInput | string[]
    jobs?: JobUpdateManyWithoutRecruiterNestedInput
  }

  export type RecruiterUncheckedUpdateWithoutApplicationsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    companySize?: NullableStringFieldUpdateOperationsInput | string | null
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    companyDescription?: NullableStringFieldUpdateOperationsInput | string | null
    companyLogo?: NullableStringFieldUpdateOperationsInput | string | null
    companyBenefits?: RecruiterUpdatecompanyBenefitsInput | string[]
    hiringNeeds?: RecruiterUpdatehiringNeedsInput | string[]
    preferredLocations?: RecruiterUpdatepreferredLocationsInput | string[]
    jobs?: JobUncheckedUpdateManyWithoutRecruiterNestedInput
  }

  export type JobSeekerCreateWithoutResumesInput = {
    id?: string
    email: string
    password?: string | null
    fullName: string
    phone?: string | null
    currentJobTitle?: string | null
    yearsOfExperience?: string | null
    education?: string | null
    skills?: JobSeekerCreateskillsInput | string[]
    resume?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    lastLogin?: Date | string | null
    profileComplete?: boolean
    emailVerified?: boolean
    phoneVerified?: boolean
    bio?: string | null
    linkedinUrl?: string | null
    githubUrl?: string | null
    portfolioUrl?: string | null
    preferredJobTypes?: JobSeekerCreatepreferredJobTypesInput | string[]
    expectedSalary?: string | null
    noticePeriod?: string | null
    languages?: JobSeekerCreatelanguagesInput | string[]
    certifications?: JobSeekerCreatecertificationsInput | string[]
    applications?: JobApplicationCreateNestedManyWithoutJobSeekerInput
  }

  export type JobSeekerUncheckedCreateWithoutResumesInput = {
    id?: string
    email: string
    password?: string | null
    fullName: string
    phone?: string | null
    currentJobTitle?: string | null
    yearsOfExperience?: string | null
    education?: string | null
    skills?: JobSeekerCreateskillsInput | string[]
    resume?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    isActive?: boolean
    lastLogin?: Date | string | null
    profileComplete?: boolean
    emailVerified?: boolean
    phoneVerified?: boolean
    bio?: string | null
    linkedinUrl?: string | null
    githubUrl?: string | null
    portfolioUrl?: string | null
    preferredJobTypes?: JobSeekerCreatepreferredJobTypesInput | string[]
    expectedSalary?: string | null
    noticePeriod?: string | null
    languages?: JobSeekerCreatelanguagesInput | string[]
    certifications?: JobSeekerCreatecertificationsInput | string[]
    applications?: JobApplicationUncheckedCreateNestedManyWithoutJobSeekerInput
  }

  export type JobSeekerCreateOrConnectWithoutResumesInput = {
    where: JobSeekerWhereUniqueInput
    create: XOR<JobSeekerCreateWithoutResumesInput, JobSeekerUncheckedCreateWithoutResumesInput>
  }

  export type JobSeekerUpsertWithoutResumesInput = {
    update: XOR<JobSeekerUpdateWithoutResumesInput, JobSeekerUncheckedUpdateWithoutResumesInput>
    create: XOR<JobSeekerCreateWithoutResumesInput, JobSeekerUncheckedCreateWithoutResumesInput>
    where?: JobSeekerWhereInput
  }

  export type JobSeekerUpdateToOneWithWhereWithoutResumesInput = {
    where?: JobSeekerWhereInput
    data: XOR<JobSeekerUpdateWithoutResumesInput, JobSeekerUncheckedUpdateWithoutResumesInput>
  }

  export type JobSeekerUpdateWithoutResumesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    currentJobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    yearsOfExperience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JobSeekerUpdateskillsInput | string[]
    resume?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    preferredJobTypes?: JobSeekerUpdatepreferredJobTypesInput | string[]
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    noticePeriod?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: JobSeekerUpdatelanguagesInput | string[]
    certifications?: JobSeekerUpdatecertificationsInput | string[]
    applications?: JobApplicationUpdateManyWithoutJobSeekerNestedInput
  }

  export type JobSeekerUncheckedUpdateWithoutResumesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    currentJobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    yearsOfExperience?: NullableStringFieldUpdateOperationsInput | string | null
    education?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: JobSeekerUpdateskillsInput | string[]
    resume?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    profileComplete?: BoolFieldUpdateOperationsInput | boolean
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    phoneVerified?: BoolFieldUpdateOperationsInput | boolean
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    preferredJobTypes?: JobSeekerUpdatepreferredJobTypesInput | string[]
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    noticePeriod?: NullableStringFieldUpdateOperationsInput | string | null
    languages?: JobSeekerUpdatelanguagesInput | string[]
    certifications?: JobSeekerUpdatecertificationsInput | string[]
    applications?: JobApplicationUncheckedUpdateManyWithoutJobSeekerNestedInput
  }

  export type JobApplicationCreateManyJobSeekerInput = {
    id?: string
    jobId: string
    recruiterId: string
    resumeUrl?: string | null
    coverLetter?: string | null
    expectedSalary?: string | null
    noticePeriod?: string | null
    availabilityDate?: string | null
    status?: string
    appliedDate?: Date | string
    reviewedDate?: Date | string | null
    notes?: string | null
    portfolioUrl?: string | null
    linkedinUrl?: string | null
    githubUrl?: string | null
    additionalNotes?: string | null
  }

  export type ResumeCreateManyJobSeekerInput = {
    id?: string
    name: string
    template: string
    data: InputJsonValue
    lastModified?: Date | string
    jobApplications?: number
    isActive?: boolean
  }

  export type JobApplicationUpdateWithoutJobSeekerInput = {
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    noticePeriod?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityDate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    appliedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    job?: JobUpdateOneRequiredWithoutApplicationsNestedInput
    recruiter?: RecruiterUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type JobApplicationUncheckedUpdateWithoutJobSeekerInput = {
    jobId?: StringFieldUpdateOperationsInput | string
    recruiterId?: StringFieldUpdateOperationsInput | string
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    noticePeriod?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityDate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    appliedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JobApplicationUncheckedUpdateManyWithoutJobSeekerInput = {
    jobId?: StringFieldUpdateOperationsInput | string
    recruiterId?: StringFieldUpdateOperationsInput | string
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    noticePeriod?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityDate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    appliedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResumeUpdateWithoutJobSeekerInput = {
    name?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    data?: InputJsonValue | InputJsonValue
    lastModified?: DateTimeFieldUpdateOperationsInput | Date | string
    jobApplications?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ResumeUncheckedUpdateWithoutJobSeekerInput = {
    name?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    data?: InputJsonValue | InputJsonValue
    lastModified?: DateTimeFieldUpdateOperationsInput | Date | string
    jobApplications?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ResumeUncheckedUpdateManyWithoutJobSeekerInput = {
    name?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    data?: InputJsonValue | InputJsonValue
    lastModified?: DateTimeFieldUpdateOperationsInput | Date | string
    jobApplications?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type JobCreateManyRecruiterInput = {
    id?: string
    title: string
    department?: string | null
    company: string
    companyId?: string | null
    location: string
    locationType: string
    employmentType: string
    experienceLevel?: string | null
    salaryMin?: number | null
    salaryMax?: number | null
    salaryCurrency?: string | null
    salaryPeriod?: string | null
    description: string
    responsibilities?: JobCreateresponsibilitiesInput | string[]
    requirements?: JobCreaterequirementsInput | string[]
    benefits?: JobCreatebenefitsInput | string[]
    applicationDeadline?: string | null
    applicationUrl?: string | null
    postedDate?: Date | string
    applicantsCount?: number
  }

  export type JobApplicationCreateManyRecruiterInput = {
    id?: string
    jobId: string
    jobSeekerId: string
    resumeUrl?: string | null
    coverLetter?: string | null
    expectedSalary?: string | null
    noticePeriod?: string | null
    availabilityDate?: string | null
    status?: string
    appliedDate?: Date | string
    reviewedDate?: Date | string | null
    notes?: string | null
    portfolioUrl?: string | null
    linkedinUrl?: string | null
    githubUrl?: string | null
    additionalNotes?: string | null
  }

  export type JobUpdateWithoutRecruiterInput = {
    title?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    company?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    location?: StringFieldUpdateOperationsInput | string
    locationType?: StringFieldUpdateOperationsInput | string
    employmentType?: StringFieldUpdateOperationsInput | string
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    salaryMin?: NullableIntFieldUpdateOperationsInput | number | null
    salaryMax?: NullableIntFieldUpdateOperationsInput | number | null
    salaryCurrency?: NullableStringFieldUpdateOperationsInput | string | null
    salaryPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    responsibilities?: JobUpdateresponsibilitiesInput | string[]
    requirements?: JobUpdaterequirementsInput | string[]
    benefits?: JobUpdatebenefitsInput | string[]
    applicationDeadline?: NullableStringFieldUpdateOperationsInput | string | null
    applicationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    applicantsCount?: IntFieldUpdateOperationsInput | number
    applications?: JobApplicationUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateWithoutRecruiterInput = {
    title?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    company?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    location?: StringFieldUpdateOperationsInput | string
    locationType?: StringFieldUpdateOperationsInput | string
    employmentType?: StringFieldUpdateOperationsInput | string
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    salaryMin?: NullableIntFieldUpdateOperationsInput | number | null
    salaryMax?: NullableIntFieldUpdateOperationsInput | number | null
    salaryCurrency?: NullableStringFieldUpdateOperationsInput | string | null
    salaryPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    responsibilities?: JobUpdateresponsibilitiesInput | string[]
    requirements?: JobUpdaterequirementsInput | string[]
    benefits?: JobUpdatebenefitsInput | string[]
    applicationDeadline?: NullableStringFieldUpdateOperationsInput | string | null
    applicationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    applicantsCount?: IntFieldUpdateOperationsInput | number
    applications?: JobApplicationUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateManyWithoutRecruiterInput = {
    title?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    company?: StringFieldUpdateOperationsInput | string
    companyId?: NullableStringFieldUpdateOperationsInput | string | null
    location?: StringFieldUpdateOperationsInput | string
    locationType?: StringFieldUpdateOperationsInput | string
    employmentType?: StringFieldUpdateOperationsInput | string
    experienceLevel?: NullableStringFieldUpdateOperationsInput | string | null
    salaryMin?: NullableIntFieldUpdateOperationsInput | number | null
    salaryMax?: NullableIntFieldUpdateOperationsInput | number | null
    salaryCurrency?: NullableStringFieldUpdateOperationsInput | string | null
    salaryPeriod?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    responsibilities?: JobUpdateresponsibilitiesInput | string[]
    requirements?: JobUpdaterequirementsInput | string[]
    benefits?: JobUpdatebenefitsInput | string[]
    applicationDeadline?: NullableStringFieldUpdateOperationsInput | string | null
    applicationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    applicantsCount?: IntFieldUpdateOperationsInput | number
  }

  export type JobApplicationUpdateWithoutRecruiterInput = {
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    noticePeriod?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityDate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    appliedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    job?: JobUpdateOneRequiredWithoutApplicationsNestedInput
    jobSeeker?: JobSeekerUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type JobApplicationUncheckedUpdateWithoutRecruiterInput = {
    jobId?: StringFieldUpdateOperationsInput | string
    jobSeekerId?: StringFieldUpdateOperationsInput | string
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    noticePeriod?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityDate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    appliedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JobApplicationUncheckedUpdateManyWithoutRecruiterInput = {
    jobId?: StringFieldUpdateOperationsInput | string
    jobSeekerId?: StringFieldUpdateOperationsInput | string
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    noticePeriod?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityDate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    appliedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JobApplicationCreateManyJobInput = {
    id?: string
    jobSeekerId: string
    recruiterId: string
    resumeUrl?: string | null
    coverLetter?: string | null
    expectedSalary?: string | null
    noticePeriod?: string | null
    availabilityDate?: string | null
    status?: string
    appliedDate?: Date | string
    reviewedDate?: Date | string | null
    notes?: string | null
    portfolioUrl?: string | null
    linkedinUrl?: string | null
    githubUrl?: string | null
    additionalNotes?: string | null
  }

  export type JobApplicationUpdateWithoutJobInput = {
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    noticePeriod?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityDate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    appliedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    jobSeeker?: JobSeekerUpdateOneRequiredWithoutApplicationsNestedInput
    recruiter?: RecruiterUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type JobApplicationUncheckedUpdateWithoutJobInput = {
    jobSeekerId?: StringFieldUpdateOperationsInput | string
    recruiterId?: StringFieldUpdateOperationsInput | string
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    noticePeriod?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityDate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    appliedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type JobApplicationUncheckedUpdateManyWithoutJobInput = {
    jobSeekerId?: StringFieldUpdateOperationsInput | string
    recruiterId?: StringFieldUpdateOperationsInput | string
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    expectedSalary?: NullableStringFieldUpdateOperationsInput | string | null
    noticePeriod?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityDate?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    appliedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    linkedinUrl?: NullableStringFieldUpdateOperationsInput | string | null
    githubUrl?: NullableStringFieldUpdateOperationsInput | string | null
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
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