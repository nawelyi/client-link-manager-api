import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

// Extiende Zod con la función .openapi() INMEDIATAMENTE
extendZodWithOpenApi(z);

// Exporta el 'z' ya parcheado para que el resto de la app lo use
export { z };

// También exportamos ZodSchema para nuestro middleware
export type { ZodSchema } from 'zod';