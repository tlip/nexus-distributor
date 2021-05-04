type EnvType = 'boolean' | 'string' | 'number';

const parseEnv = (
  envVarName: any,
  opts?: { type?: EnvType; required?: boolean }
) => {
  const envVar = process.env[`REACT_APP_${envVarName}`];
  const type = opts?.type ?? 'string';
  const required = opts?.required ?? false;

  if (required && typeof envVarName === 'undefined') {
    console.error(`⛔️ WARNING ⛔️\n===========\n${envVarName} is undefined`);
  }

  if (!envVar && envVar !== '0') {
    return;
  }

  switch (type) {
    case 'boolean':
      return Boolean(envVar || false);
    case 'number':
      return parseInt(envVar || '');
    case 'string':
    default:
      return `${envVar}`;
  }
};

export const env = {
  GITHUB_PAGES: parseEnv('GITHUB_PAGES', { type: 'boolean' }) as boolean,
};
