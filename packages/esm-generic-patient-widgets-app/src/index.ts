import { defineConfigSchema, defineExtensionConfigSchema, getAsyncLifecycle } from '@openmrs/esm-framework';
import { configSchema } from './config-schema';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

const backendDependencies = {
  fhir2: '^1.2.0',
};

function setupOpenMRS() {
  const moduleName = '@openmrs/esm-generic-patient-widgets-app';

  const options = {
    featureName: 'Generic widgets',
    moduleName,
  };

  defineExtensionConfigSchema('obs-by-encounter-widget', configSchema);

  return {
    extensions: [
      {
        name: 'obs-by-encounter-widget',
        load: getAsyncLifecycle(() => import('./obs-switchable/obs-switchable.component'), options),
        meta: {
          columnSpan: 4,
        },
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
