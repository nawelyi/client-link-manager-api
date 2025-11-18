// src/core/swagger.ts
import {
  OpenApiGeneratorV31,
  OpenAPIRegistry, // <-- ARREGLO 1: Corregido a 'OpenApiRegistry'
  
} from '@asteasolutions/zod-to-openapi'; // ¡El paquete correcto!
import { z } from './zod';

// Importa TODOS tus schemas refactorizados
import { registerSchema, loginSchema } from '../api/auth/auth.validation';
import { clientSchema } from '../api/clients/client.validation'; // Usando tu nombre de schema
import { createLinkSchema, getAllLinksSchema } from '../api/links/links.validation';




// --- 1. Define tus Schemas ---
const registry = new OpenAPIRegistry(); // <-- ARREGLO 1 (de nuevo)

// Registra los schemas de Zod
registry.register('RegisterUser', registerSchema);
registry.register('LoginUser', loginSchema);
registry.register('CreateClient', clientSchema); // Usando tu nombre de schema
registry.register('CreateLink', createLinkSchema);
registry.register('GetAllClientLinks', getAllLinksSchema)

// Schema de Error
const ErrorSchema = z.object({
  message: z.string(),
});

// --- ARREGLO 2: Mueve la seguridad aquí ---
// Define el esquema de seguridad (Auth) y regístralo como un componente
registry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
});

// --- 2. Define tus Rutas (Endpoints) ---

// -- AUTH --
registry.registerPath({
  method: 'post',
  path: '/auth/register',
  summary: 'Registrar un nuevo usuario',
  tags: ['Auth'],
  request: {
    body: {
      content: { 'application/json': { schema: registerSchema } },
    },
  },
  responses: {
    201: { description: 'Usuario creado' },
    400: {
      description: 'Datos inválidos',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
});

registry.registerPath({
  method: 'post',
  path: '/auth/login',
  summary: 'Iniciar sesión',
  tags: ['Auth'],
  request: {
    body: {
      content: { 'application/json': { schema: loginSchema } },
    },
  },
  responses: {
    200: { description: 'Token de acceso' },
    401: { description: 'Credenciales inválidas' },
  },
});

registry.registerPath({
  method: 'get',
  path: '/auth/me',
  summary: 'Obtener información del usuario autenticado',
  tags: ['Auth'],
  security: [{ bearerAuth: [] }],
  responses: {
    200: { description: 'Información del usuario' },
    401: { description: 'No autorizado' },
  },
});

// -- CLIENTS --
registry.registerPath({
  method: 'post',
  path: '/client',
  summary: 'Crear un nuevo cliente',
  tags: ['Clients'],
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: { 'application/json': { schema: clientSchema } }, // Usando tu schema
    },
  },
  responses: {
    201: { description: 'Cliente creado' },
    401: { description: 'No autorizado' },
  },
});

registry.registerPath({
  method: 'get',
  path: '/client',
  summary: 'Obtener todos los clientes del usuario',
  tags: ['Clients'],
  security: [{ bearerAuth: [] }], // <-- ARREGLO 3: Añadida la seguridad
  responses: {
    200: { description: 'Lista de clientes' },
    401: { description: 'No autorizado' },
  },
});

// -- LINKS --
registry.registerPath({
  method: 'post',
  path: '/links',
  summary: 'Crear un nuevo link para un cliente',
  tags: ['Links'],
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: { 'application/json': { schema: createLinkSchema } },
    },
  },
  responses: {
    201: { description: 'Link creado' },
    401: { description: 'No autorizado' },
  },
});

// ... (después del registry.registerPath de POST /links)

registry.registerPath({
  method: 'get',
  path: '/links',
  summary: 'Obtener todos los links de un cliente específico',
  tags: ['Links'],
  security: [{ bearerAuth: [] }],
  request: {
    // ¡La documentación para un Query Param!
    query: getAllLinksSchema,
  },
  responses: {
    200: { description: 'Lista de links' },
    400: { description: 'Cliente no encontrado' },
    401: { description: 'No autorizado' },
  },
});

// --- 3. Genera el Documento Final ---
const generator = new OpenApiGeneratorV31(registry.definitions);

export const openApiSpecification = generator.generateDocument({
  openapi: '3.1.0',
  info: {
    title: 'Client Link Manager API',
    version: '1.0.0',
    description: 'API para gestionar clientes y sus links.',
  },
  servers: [{ url: '/api/v1' }],

  // --- ARREGLO 2: El bloque 'components' se ha ELIMINADO de aquí ---
});