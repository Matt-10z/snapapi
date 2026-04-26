export interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
}

export function generateEndpoints(resource: string, _json: string): Endpoint[] {
  const name = resource.toLowerCase().replace(/\s+/g, '-');

  return [
    {
      method: 'GET',
      path: `/${name}`,
      description: `List all ${name}`,
    },
    {
      method: 'GET',
      path: `/${name}/:id`,
      description: `Get a single ${name.slice(0, -1)} by ID`,
    },
    {
      method: 'POST',
      path: `/${name}`,
      description: `Create a new ${name.slice(0, -1)}`,
    },
    {
      method: 'PUT',
      path: `/${name}/:id`,
      description: `Update a ${name.slice(0, -1)} by ID`,
    },
    {
      method: 'DELETE',
      path: `/${name}/:id`,
      description: `Delete a ${name.slice(0, -1)} by ID`,
    },
  ];
}
