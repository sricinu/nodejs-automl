// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **

import * as gax from 'google-gax';
import {
  APICallback,
  Callback,
  CallOptions,
  Descriptors,
  ClientOptions,
  LROperation,
} from 'google-gax';
import * as path from 'path';

import * as protosTypes from '../../protos/protos';
import * as gapicConfig from './prediction_service_client_config.json';

const version = require('../../../package.json').version;

/**
 *  AutoML Prediction API.
 *
 *  On any input that is documented to expect a string parameter in
 *  snake_case or kebab-case, either of those cases is accepted.
 * @class
 * @memberof v1
 */
export class PredictionServiceClient {
  private _descriptors: Descriptors = {page: {}, stream: {}, longrunning: {}};
  private _innerApiCalls: {[name: string]: Function};
  private _pathTemplates: {[name: string]: gax.PathTemplate};
  private _terminated = false;
  private _opts: ClientOptions;
  private _gaxModule: typeof gax | typeof gax.fallback;
  private _gaxGrpc: gax.GrpcClient | gax.fallback.GrpcClient;
  private _protos: {};
  private _defaults: {[method: string]: gax.CallSettings};
  auth: gax.GoogleAuth;
  operationsClient: gax.OperationsClient;
  predictionServiceStub?: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of PredictionServiceClient.
   *
   * @param {object} [options] - The configuration object. See the subsequent
   *   parameters for more details.
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   */

  constructor(opts?: ClientOptions) {
    // Ensure that options include the service address and port.
    const staticMembers = this.constructor as typeof PredictionServiceClient;
    const servicePath =
      opts && opts.servicePath
        ? opts.servicePath
        : opts && opts.apiEndpoint
        ? opts.apiEndpoint
        : staticMembers.servicePath;
    const port = opts && opts.port ? opts.port : staticMembers.port;

    if (!opts) {
      opts = {servicePath, port};
    }
    opts.servicePath = opts.servicePath || servicePath;
    opts.port = opts.port || port;
    opts.clientConfig = opts.clientConfig || {};

    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      opts.fallback = true;
    }
    // If we are in browser, we are already using fallback because of the
    // "browser" field in package.json.
    // But if we were explicitly requested to use fallback, let's do it now.
    this._gaxModule = !isBrowser && opts.fallback ? gax.fallback : gax;

    // Create a `gaxGrpc` object, with any grpc-specific options
    // sent to the client.
    opts.scopes = (this.constructor as typeof PredictionServiceClient).scopes;
    this._gaxGrpc = new this._gaxModule.GrpcClient(opts);

    // Save options to use in initialize() method.
    this._opts = opts;

    // Save the auth object to the client, for use by other methods.
    this.auth = this._gaxGrpc.auth as gax.GoogleAuth;

    // Determine the client header string.
    const clientHeader = [`gax/${this._gaxModule.version}`, `gapic/${version}`];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${this._gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${this._gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    // For Node.js, pass the path to JSON proto file.
    // For browsers, pass the JSON content.

    const nodejsProtoPath = path.join(
      __dirname,
      '..',
      '..',
      'protos',
      'protos.json'
    );
    this._protos = this._gaxGrpc.loadProto(
      opts.fallback ? require('../../protos/protos.json') : nodejsProtoPath
    );

    // This API contains "path templates"; forward-slash-separated
    // identifiers to uniquely identify resources within the API.
    // Create useful helper objects for these.
    this._pathTemplates = {
      annotationSpecPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/datasets/{dataset}/annotationSpecs/{annotation_spec}'
      ),
      datasetPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/datasets/{dataset}'
      ),
      modelPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/models/{model}'
      ),
      modelEvaluationPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/models/{model}/modelEvaluations/{model_evaluation}'
      ),
    };

    // This API contains "long-running operations", which return a
    // an Operation object that allows for tracking of the operation,
    // rather than holding a request open.
    const protoFilesRoot = opts.fallback
      ? this._gaxModule.protobuf.Root.fromJSON(
          require('../../protos/protos.json')
        )
      : this._gaxModule.protobuf.loadSync(nodejsProtoPath);

    this.operationsClient = this._gaxModule
      .lro({
        auth: this.auth,
        grpc: 'grpc' in this._gaxGrpc ? this._gaxGrpc.grpc : undefined,
      })
      .operationsClient(opts);
    const batchPredictResponse = protoFilesRoot.lookup(
      '.google.cloud.automl.v1.BatchPredictResult'
    ) as gax.protobuf.Type;
    const batchPredictMetadata = protoFilesRoot.lookup(
      '.google.cloud.automl.v1.OperationMetadata'
    ) as gax.protobuf.Type;

    this._descriptors.longrunning = {
      batchPredict: new this._gaxModule.LongrunningDescriptor(
        this.operationsClient,
        batchPredictResponse.decode.bind(batchPredictResponse),
        batchPredictMetadata.decode.bind(batchPredictMetadata)
      ),
    };

    // Put together the default options sent with requests.
    this._defaults = this._gaxGrpc.constructSettings(
      'google.cloud.automl.v1.PredictionService',
      gapicConfig as gax.ClientConfig,
      opts.clientConfig || {},
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this._innerApiCalls = {};
  }

  /**
   * Initialize the client.
   * Performs asynchronous operations (such as authentication) and prepares the client.
   * This function will be called automatically when any class method is called for the
   * first time, but if you need to initialize it before calling an actual method,
   * feel free to call initialize() directly.
   *
   * You can await on this method if you want to make sure the client is initialized.
   *
   * @returns {Promise} A promise that resolves to an authenticated service stub.
   */
  initialize() {
    // If the client stub promise is already initialized, return immediately.
    if (this.predictionServiceStub) {
      return this.predictionServiceStub;
    }

    // Put together the "service stub" for
    // google.cloud.automl.v1.PredictionService.
    this.predictionServiceStub = this._gaxGrpc.createStub(
      this._opts.fallback
        ? (this._protos as protobuf.Root).lookupService(
            'google.cloud.automl.v1.PredictionService'
          )
        : // tslint:disable-next-line no-any
          (this._protos as any).google.cloud.automl.v1.PredictionService,
      this._opts
    ) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const predictionServiceStubMethods = ['predict', 'batchPredict'];

    for (const methodName of predictionServiceStubMethods) {
      const innerCallPromise = this.predictionServiceStub.then(
        stub => (...args: Array<{}>) => {
          if (this._terminated) {
            return Promise.reject('The client has already been closed.');
          }
          return stub[methodName].apply(stub, args);
        },
        (err: Error | null | undefined) => () => {
          throw err;
        }
      );

      const apiCall = this._gaxModule.createApiCall(
        innerCallPromise,
        this._defaults[methodName],
        this._descriptors.page[methodName] ||
          this._descriptors.stream[methodName] ||
          this._descriptors.longrunning[methodName]
      );

      this._innerApiCalls[methodName] = (
        argument: {},
        callOptions?: CallOptions,
        callback?: APICallback
      ) => {
        return apiCall(argument, callOptions, callback);
      };
    }

    return this.predictionServiceStub;
  }

  /**
   * The DNS address for this API service.
   */
  static get servicePath() {
    return 'automl.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   */
  static get apiEndpoint() {
    return 'automl.googleapis.com';
  }

  /**
   * The port for this API service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   */
  static get scopes() {
    return ['https://www.googleapis.com/auth/cloud-platform'];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @param {function(Error, string)} callback - the callback to
   *   be called with the current project Id.
   */
  getProjectId(
    callback?: Callback<string, undefined, undefined>
  ): Promise<string> | void {
    if (callback) {
      this.auth.getProjectId(callback);
      return;
    }
    return this.auth.getProjectId();
  }

  // -------------------
  // -- Service calls --
  // -------------------
  predict(
    request: protosTypes.google.cloud.automl.v1.IPredictRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.cloud.automl.v1.IPredictResponse,
      protosTypes.google.cloud.automl.v1.IPredictRequest | undefined,
      {} | undefined
    ]
  >;
  predict(
    request: protosTypes.google.cloud.automl.v1.IPredictRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.cloud.automl.v1.IPredictResponse,
      protosTypes.google.cloud.automl.v1.IPredictRequest | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Perform an online prediction. The prediction result is directly
   * returned in the response.
   * Available for following ML scenarios, and their expected request payloads:
   *
   * <table>
   * <tr>
   * <td>AutoML Vision Classification</td>
   * <td>An image in .JPEG, .GIF or .PNG format, image_bytes up to 30MB.</td>
   * </tr>
   * <tr>
   * <td>AutoML Vision Object Detection</td>
   * <td>An image in .JPEG, .GIF or .PNG format, image_bytes up to 30MB.</td>
   * </tr>
   * <tr>
   * <td>AutoML Natural Language Classification</td>
   * <td>A TextSnippet up to 60,000 characters, UTF-8 encoded or a document in
   * .PDF, .TIF or .TIFF format with size upto 2MB.</td>
   * </tr>
   * <tr>
   * <td>AutoML Natural Language Entity Extraction</td>
   * <td>A TextSnippet up to 10,000 characters, UTF-8 NFC encoded or a document
   *  in .PDF, .TIF or .TIFF format with size upto 20MB.</td>
   * </tr>
   * <tr>
   * <td>AutoML Natural Language Sentiment Analysis</td>
   * <td>A TextSnippet up to 60,000 characters, UTF-8 encoded or a document in
   * .PDF, .TIF or .TIFF format with size upto 2MB.</td>
   * </tr>
   * <tr>
   * <td>AutoML Translation</td>
   * <td>A TextSnippet up to 25,000 characters, UTF-8 encoded.</td>
   * </tr>
   * <tr>
   * <td>AutoML Tables</td>
   * <td>A row with column values matching
   *   the columns of the model, up to 5MB. Not available for FORECASTING
   *   `prediction_type`.
   * </td>
   * </tr>
   * </table>
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   Required. Name of the model requested to serve the prediction.
   * @param {google.cloud.automl.v1.ExamplePayload} request.payload
   *   Required. Payload to perform a prediction on. The payload must match the
   *   problem type that the model was trained to solve.
   * @param {number[]} request.params
   *   Additional domain-specific parameters, any string must be up to 25000
   *   characters long.
   *
   *   <h4>AutoML Vision Classification</h4>
   *
   *   `score_threshold`
   *   : (float) A value from 0.0 to 1.0. When the model
   *     makes predictions for an image, it will only produce results that have
   *     at least this confidence score. The default is 0.5.
   *
   *   <h4>AutoML Vision Object Detection</h4>
   *
   *   `score_threshold`
   *   : (float) When Model detects objects on the image,
   *     it will only produce bounding boxes which have at least this
   *     confidence score. Value in 0 to 1 range, default is 0.5.
   *
   *   `max_bounding_box_count`
   *   : (int64) The maximum number of bounding
   *     boxes returned. The default is 100. The
   *     number of returned bounding boxes might be limited by the server.
   *
   *   <h4>AutoML Tables</h4>
   *
   *   `feature_importance`
   *   : (boolean) Whether
   *
   *   {@link google.cloud.automl.v1.TablesModelColumnInfo.feature_importance|feature_importance}
   *     is populated in the returned list of
   *     {@link google.cloud.automl.v1.TablesAnnotation|TablesAnnotation}
   *     objects. The default is false.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [PredictResponse]{@link google.cloud.automl.v1.PredictResponse}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  predict(
    request: protosTypes.google.cloud.automl.v1.IPredictRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.cloud.automl.v1.IPredictResponse,
          protosTypes.google.cloud.automl.v1.IPredictRequest | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.cloud.automl.v1.IPredictResponse,
      protosTypes.google.cloud.automl.v1.IPredictRequest | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.cloud.automl.v1.IPredictResponse,
      protosTypes.google.cloud.automl.v1.IPredictRequest | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      name: request.name || '',
    });
    this.initialize();
    return this._innerApiCalls.predict(request, options, callback);
  }

  batchPredict(
    request: protosTypes.google.cloud.automl.v1.IBatchPredictRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      LROperation<
        protosTypes.google.cloud.automl.v1.IBatchPredictResult,
        protosTypes.google.cloud.automl.v1.IOperationMetadata
      >,
      protosTypes.google.longrunning.IOperation | undefined,
      {} | undefined
    ]
  >;
  batchPredict(
    request: protosTypes.google.cloud.automl.v1.IBatchPredictRequest,
    options: gax.CallOptions,
    callback: Callback<
      LROperation<
        protosTypes.google.cloud.automl.v1.IBatchPredictResult,
        protosTypes.google.cloud.automl.v1.IOperationMetadata
      >,
      protosTypes.google.longrunning.IOperation | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Perform a batch prediction. Unlike the online {@link google.cloud.automl.v1.PredictionService.Predict|Predict}, batch
   * prediction result won't be immediately available in the response. Instead,
   * a long running operation object is returned. User can poll the operation
   * result via {@link google.longrunning.Operations.GetOperation|GetOperation}
   * method. Once the operation is done, {@link google.cloud.automl.v1.BatchPredictResult|BatchPredictResult} is returned in
   * the {@link google.longrunning.Operation.response|response} field.
   * Available for following ML scenarios:
   *
   * * AutoML Vision Classification
   * * AutoML Vision Object Detection
   * * AutoML Video Intelligence Classification
   * * AutoML Video Intelligence Object Tracking * AutoML Natural Language Classification
   * * AutoML Natural Language Entity Extraction
   * * AutoML Natural Language Sentiment Analysis
   * * AutoML Tables
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   Required. Name of the model requested to serve the batch prediction.
   * @param {google.cloud.automl.v1.BatchPredictInputConfig} request.inputConfig
   *   Required. The input configuration for batch prediction.
   * @param {google.cloud.automl.v1.BatchPredictOutputConfig} request.outputConfig
   *   Required. The Configuration specifying where output predictions should
   *   be written.
   * @param {number[]} request.params
   *   Additional domain-specific parameters for the predictions, any string must
   *   be up to 25000 characters long.
   *
   *   <h4>AutoML Natural Language Classification</h4>
   *
   *   `score_threshold`
   *   : (float) A value from 0.0 to 1.0. When the model
   *     makes predictions for a text snippet, it will only produce results
   *     that have at least this confidence score. The default is 0.5.
   *
   *
   *   <h4>AutoML Vision Classification</h4>
   *
   *   `score_threshold`
   *   : (float) A value from 0.0 to 1.0. When the model
   *     makes predictions for an image, it will only produce results that
   *     have at least this confidence score. The default is 0.5.
   *
   *   <h4>AutoML Vision Object Detection</h4>
   *
   *   `score_threshold`
   *   : (float) When Model detects objects on the image,
   *     it will only produce bounding boxes which have at least this
   *     confidence score. Value in 0 to 1 range, default is 0.5.
   *
   *   `max_bounding_box_count`
   *   : (int64) The maximum number of bounding
   *     boxes returned per image. The default is 100, the
   *     number of bounding boxes returned might be limited by the server.
   *   <h4>AutoML Video Intelligence Classification</h4>
   *
   *   `score_threshold`
   *   : (float) A value from 0.0 to 1.0. When the model
   *     makes predictions for a video, it will only produce results that
   *     have at least this confidence score. The default is 0.5.
   *
   *   `segment_classification`
   *   : (boolean) Set to true to request
   *     segment-level classification. AutoML Video Intelligence returns
   *     labels and their confidence scores for the entire segment of the
   *     video that user specified in the request configuration.
   *     The default is true.
   *
   *   `shot_classification`
   *   : (boolean) Set to true to request shot-level
   *     classification. AutoML Video Intelligence determines the boundaries
   *     for each camera shot in the entire segment of the video that user
   *     specified in the request configuration. AutoML Video Intelligence
   *     then returns labels and their confidence scores for each detected
   *     shot, along with the start and end time of the shot.
   *     The default is false.
   *
   *     WARNING: Model evaluation is not done for this classification type,
   *     the quality of it depends on training data, but there are no metrics
   *     provided to describe that quality.
   *
   *   `1s_interval_classification`
   *   : (boolean) Set to true to request
   *     classification for a video at one-second intervals. AutoML Video
   *     Intelligence returns labels and their confidence scores for each
   *     second of the entire segment of the video that user specified in the
   *     request configuration. The default is false.
   *
   *     WARNING: Model evaluation is not done for this classification
   *     type, the quality of it depends on training data, but there are no
   *     metrics provided to describe that quality.
   *
   *   <h4>AutoML Video Intelligence Object Tracking</h4>
   *
   *   `score_threshold`
   *   : (float) When Model detects objects on video frames,
   *     it will only produce bounding boxes which have at least this
   *     confidence score. Value in 0 to 1 range, default is 0.5.
   *
   *   `max_bounding_box_count`
   *   : (int64) The maximum number of bounding
   *     boxes returned per image. The default is 100, the
   *     number of bounding boxes returned might be limited by the server.
   *
   *   `min_bounding_box_size`
   *   : (float) Only bounding boxes with shortest edge
   *     at least that long as a relative value of video frame size are
   *     returned. Value in 0 to 1 range. Default is 0.
   *
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Operation]{@link google.longrunning.Operation}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  batchPredict(
    request: protosTypes.google.cloud.automl.v1.IBatchPredictRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          LROperation<
            protosTypes.google.cloud.automl.v1.IBatchPredictResult,
            protosTypes.google.cloud.automl.v1.IOperationMetadata
          >,
          protosTypes.google.longrunning.IOperation | undefined,
          {} | undefined
        >,
    callback?: Callback<
      LROperation<
        protosTypes.google.cloud.automl.v1.IBatchPredictResult,
        protosTypes.google.cloud.automl.v1.IOperationMetadata
      >,
      protosTypes.google.longrunning.IOperation | undefined,
      {} | undefined
    >
  ): Promise<
    [
      LROperation<
        protosTypes.google.cloud.automl.v1.IBatchPredictResult,
        protosTypes.google.cloud.automl.v1.IOperationMetadata
      >,
      protosTypes.google.longrunning.IOperation | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      name: request.name || '',
    });
    this.initialize();
    return this._innerApiCalls.batchPredict(request, options, callback);
  }
  // --------------------
  // -- Path templates --
  // --------------------

  /**
   * Return a fully-qualified annotationSpec resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} dataset
   * @param {string} annotation_spec
   * @returns {string} Resource name string.
   */
  annotationSpecPath(
    project: string,
    location: string,
    dataset: string,
    annotationSpec: string
  ) {
    return this._pathTemplates.annotationSpecPathTemplate.render({
      project,
      location,
      dataset,
      annotation_spec: annotationSpec,
    });
  }

  /**
   * Parse the project from AnnotationSpec resource.
   *
   * @param {string} annotationSpecName
   *   A fully-qualified path representing AnnotationSpec resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromAnnotationSpecName(annotationSpecName: string) {
    return this._pathTemplates.annotationSpecPathTemplate.match(
      annotationSpecName
    ).project;
  }

  /**
   * Parse the location from AnnotationSpec resource.
   *
   * @param {string} annotationSpecName
   *   A fully-qualified path representing AnnotationSpec resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromAnnotationSpecName(annotationSpecName: string) {
    return this._pathTemplates.annotationSpecPathTemplate.match(
      annotationSpecName
    ).location;
  }

  /**
   * Parse the dataset from AnnotationSpec resource.
   *
   * @param {string} annotationSpecName
   *   A fully-qualified path representing AnnotationSpec resource.
   * @returns {string} A string representing the dataset.
   */
  matchDatasetFromAnnotationSpecName(annotationSpecName: string) {
    return this._pathTemplates.annotationSpecPathTemplate.match(
      annotationSpecName
    ).dataset;
  }

  /**
   * Parse the annotation_spec from AnnotationSpec resource.
   *
   * @param {string} annotationSpecName
   *   A fully-qualified path representing AnnotationSpec resource.
   * @returns {string} A string representing the annotation_spec.
   */
  matchAnnotationSpecFromAnnotationSpecName(annotationSpecName: string) {
    return this._pathTemplates.annotationSpecPathTemplate.match(
      annotationSpecName
    ).annotation_spec;
  }

  /**
   * Return a fully-qualified dataset resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} dataset
   * @returns {string} Resource name string.
   */
  datasetPath(project: string, location: string, dataset: string) {
    return this._pathTemplates.datasetPathTemplate.render({
      project,
      location,
      dataset,
    });
  }

  /**
   * Parse the project from Dataset resource.
   *
   * @param {string} datasetName
   *   A fully-qualified path representing Dataset resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromDatasetName(datasetName: string) {
    return this._pathTemplates.datasetPathTemplate.match(datasetName).project;
  }

  /**
   * Parse the location from Dataset resource.
   *
   * @param {string} datasetName
   *   A fully-qualified path representing Dataset resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromDatasetName(datasetName: string) {
    return this._pathTemplates.datasetPathTemplate.match(datasetName).location;
  }

  /**
   * Parse the dataset from Dataset resource.
   *
   * @param {string} datasetName
   *   A fully-qualified path representing Dataset resource.
   * @returns {string} A string representing the dataset.
   */
  matchDatasetFromDatasetName(datasetName: string) {
    return this._pathTemplates.datasetPathTemplate.match(datasetName).dataset;
  }

  /**
   * Return a fully-qualified model resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} model
   * @returns {string} Resource name string.
   */
  modelPath(project: string, location: string, model: string) {
    return this._pathTemplates.modelPathTemplate.render({
      project,
      location,
      model,
    });
  }

  /**
   * Parse the project from Model resource.
   *
   * @param {string} modelName
   *   A fully-qualified path representing Model resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromModelName(modelName: string) {
    return this._pathTemplates.modelPathTemplate.match(modelName).project;
  }

  /**
   * Parse the location from Model resource.
   *
   * @param {string} modelName
   *   A fully-qualified path representing Model resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromModelName(modelName: string) {
    return this._pathTemplates.modelPathTemplate.match(modelName).location;
  }

  /**
   * Parse the model from Model resource.
   *
   * @param {string} modelName
   *   A fully-qualified path representing Model resource.
   * @returns {string} A string representing the model.
   */
  matchModelFromModelName(modelName: string) {
    return this._pathTemplates.modelPathTemplate.match(modelName).model;
  }

  /**
   * Return a fully-qualified modelEvaluation resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} model
   * @param {string} model_evaluation
   * @returns {string} Resource name string.
   */
  modelEvaluationPath(
    project: string,
    location: string,
    model: string,
    modelEvaluation: string
  ) {
    return this._pathTemplates.modelEvaluationPathTemplate.render({
      project,
      location,
      model,
      model_evaluation: modelEvaluation,
    });
  }

  /**
   * Parse the project from ModelEvaluation resource.
   *
   * @param {string} modelEvaluationName
   *   A fully-qualified path representing ModelEvaluation resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromModelEvaluationName(modelEvaluationName: string) {
    return this._pathTemplates.modelEvaluationPathTemplate.match(
      modelEvaluationName
    ).project;
  }

  /**
   * Parse the location from ModelEvaluation resource.
   *
   * @param {string} modelEvaluationName
   *   A fully-qualified path representing ModelEvaluation resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromModelEvaluationName(modelEvaluationName: string) {
    return this._pathTemplates.modelEvaluationPathTemplate.match(
      modelEvaluationName
    ).location;
  }

  /**
   * Parse the model from ModelEvaluation resource.
   *
   * @param {string} modelEvaluationName
   *   A fully-qualified path representing ModelEvaluation resource.
   * @returns {string} A string representing the model.
   */
  matchModelFromModelEvaluationName(modelEvaluationName: string) {
    return this._pathTemplates.modelEvaluationPathTemplate.match(
      modelEvaluationName
    ).model;
  }

  /**
   * Parse the model_evaluation from ModelEvaluation resource.
   *
   * @param {string} modelEvaluationName
   *   A fully-qualified path representing ModelEvaluation resource.
   * @returns {string} A string representing the model_evaluation.
   */
  matchModelEvaluationFromModelEvaluationName(modelEvaluationName: string) {
    return this._pathTemplates.modelEvaluationPathTemplate.match(
      modelEvaluationName
    ).model_evaluation;
  }

  /**
   * Terminate the GRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   */
  close(): Promise<void> {
    this.initialize();
    if (!this._terminated) {
      return this.predictionServiceStub!.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}
