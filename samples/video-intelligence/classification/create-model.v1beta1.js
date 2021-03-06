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

'use strict';
async function main(
  projectId = 'YOUR_PROJECT_ID',
  computeRegion = 'YOUR_REGION_NAME',
  datasetId = 'YOUR_DATASET_ID',
  modelName = 'MODEL_NAME'
) {
  // [START automl_video_intelligence_classification_create_model]
  const automl = require('@google-cloud/automl');
  const client = new automl.v1beta1.AutoMlClient();

  /**
   * Demonstrates using the AutoML client to create a model.
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const projectId = '[PROJECT_ID]' e.g., "my-gcloud-project";
  // const computeRegion = '[REGION_NAME]' e.g., "us-central1";
  // const datasetId = '[DATASET_ID]' e.g., "VCN7209576908164431872";
  // const modelName = '[MODEL_NAME]' e.g., "myModel";

  // A resource that represents Google Cloud Platform location.
  const projectLocation = client.locationPath(projectId, computeRegion);

  // Set datasetId, model name and model metadata for the dataset.
  const myModel = {
    displayName: modelName,
    datasetId: datasetId,
    videoClassificationModelMetadata: {},
  };

  // Create a model with the model metadata in the region.
  client
    .createModel({parent: projectLocation, model: myModel})
    .then(responses => {
      const initialApiResponse = responses[1];
      console.log(`Training operation name: ${initialApiResponse.name}`);
      console.log(`Training started...`);
    })
    .catch(err => {
      console.error(err);
    });
  // [END automl_video_intelligence_classification_create_model]
}
main(...process.argv.slice(2)).catch(console.error());
