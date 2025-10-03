# Guía de Documentación - Commet

Esta guía explica cómo documentar los productos y funcionalidades de la plataforma Commet.

## Estructura de un documento

Todos los archivos de documentación siguen este formato MDX estándar:

```mdx
---
title: Título del Producto o Funcionalidad
description: Descripción breve que explica el propósito y valor del documento
---

import { Tabs, Tab } from 'fumadocs-ui/components/tabs'
import { Callout } from 'fumadocs-ui/components/callout'

# Título Principal

Introducción que explica el propósito del documento y para quién está dirigido.

<Callout type="info">
Platform documentation aims at business operators. For SDKs, endpoints, and code samples head to the Developer Library.
</Callout>
```

## Componentes principales

### 1. Callouts (Notas destacadas)

```mdx
<Callout type="info">
Información importante para el lector
</Callout>

<Callout type="warning">
Advertencia sobre algo crítico
</Callout>
```

### 2. Tabs (Pestañas)

Útil para mostrar diferentes casos de uso o ejemplos:

```mdx
<Tabs items={['Caso 1', 'Caso 2', 'Caso 3']}>
<Tab value="Caso 1">
Contenido del primer caso...
</Tab>
<Tab value="Caso 2">
Contenido del segundo caso...
</Tab>
<Tab value="Caso 3">
Contenido del tercer caso...
</Tab>
</Tabs>
```

### 3. Tablas

Para información estructurada:

```mdx
| Columna 1 | Columna 2 | Columna 3 |
| --- | --- | --- |
| Dato 1 | Dato 2 | Dato 3 |
| Dato 4 | Dato 5 | Dato 6 |
```

### 4. Bloques de código

Para ejemplos de código:

````mdx
```typescript
function ejemplo() {
  // código aquí
}
```
````

## Secciones recomendadas

1. **Introducción**: Qué es y para qué sirve
2. **Acceso**: Cómo acceder a la funcionalidad en la plataforma
3. **Por qué existe**: Problemas que resuelve y resultados de negocio
4. **Conceptos clave**: Explicación de la arquitectura o componentes
5. **Ejemplos del mundo real**: Casos de uso prácticos con Tabs
6. **Reglas de gobernanza**: Cuándo usar cada opción
7. **Integraciones**: Cómo se conecta con otros módulos
8. **Flujo de trabajo**: Proceso end-to-end
9. **Métricas de éxito**: KPIs importantes
10. **Troubleshooting**: Tabla de problemas comunes y soluciones
11. **Próximos pasos**: Enlaces a documentos relacionados

## Ejemplo de sección "Próximos pasos"

```mdx
## What's next?

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="border rounded-lg p-4">
    <h3 className="font-semibold mt-0">Título del enlace 1</h3>
    <p className="text-sm text-muted-foreground">Descripción breve</p>
    <p className="text-sm">[Texto del enlace →](./ruta-relativa)</p>
  </div>

  <div className="border rounded-lg p-4">
    <h3 className="font-semibold mt-0">Título del enlace 2</h3>
    <p className="text-sm text-muted-foreground">Descripción breve</p>
    <p className="text-sm">[Texto del enlace →](/ruta-absoluta)</p>
  </div>
</div>
```

## Principios de escritura

- **Audiencia**: La documentación de plataforma está dirigida a operadores de negocio, no desarrolladores
- **Claridad**: Usar ejemplos concretos y casos de uso reales
- **Estructura**: Mantener jerarquía clara con headings (##, ###)
- **Enlaces**: Siempre referenciar documentos relacionados
- **Ejemplos**: Preferir mostrar casos de uso reales con nombres de empresas ficticias pero realistas (Acme Corp, MercadoLibre, etc.)

## Nombres de archivo

- Usar kebab-case: `product-catalog.mdx`, `business-logic.mdx`
- Ubicar en la estructura correcta: `content/docs/[idioma]/[categoría]/`
- Actualizar el archivo `meta.json` correspondiente para que aparezca en la navegación

## Instrucción para Claude

**IMPORTANTE**: Siempre lee este archivo `claude.md` antes de crear o editar documentación de la plataforma Commet. Este archivo contiene la guía completa de formato, estructura y principios de escritura que debes seguir.

---

# Referencia: Products Catalog System - Business Logic & Design

## 🎯 **¿Por qué existe el Products Catalog System?**

El sistema de catálogo de productos resuelve el problema fundamental de **pricing complexity management** para plataformas de billing que necesitan manejar múltiples modelos de pricing y personalizaciones por cliente. Sin este sistema, cada nuevo pricing requeriría development custom y cada descuento rompería los analytics.

### **Problema que resuelve:**
- **Pricing chaos**: Sin sistema → Cada customer pricing hardcodeado
- **Sales confusion**: "¿Cuál es el precio oficial?" vs "¿Qué precio damos a este cliente?"
- **Analytics imposibles**: No se puede medir discount adoption vs premium pricing
- **Discount governance**: Sin approval process para descuentos enterprise
- **Pricing updates**: Cambiar precios requiere tocar código

### **Resultado empresarial:**
- ✅ **Clear pricing strategy**: "Precio lista $500, tu descuento 20%"
- ✅ **Perfect analytics**: Track list price vs customer pricing
- ✅ **Sales enablement**: Pricing tiers claros para negociación
- ✅ **Approval workflows**: Governance automática para descuentos grandes
- ✅ **Flexible business models**: Soporte para cualquier modelo de pricing

---

## 🏗️ **Arquitectura de Negocio: 4 Niveles de Pricing**

### **Nivel 1: Products (QUÉ vendes)**
```
Products = Servicios base que ofreces:
├── "API Platform" → Acceso a tu API con rate limiting
├── "Analytics Dashboard" → Reporting y insights
├── "Premium Support" → 24/7 support con SLA
├── "Data Storage" → Almacenamiento escalable
└── "AI Processing" → Machine learning services
```

**¿Por qué products separados?**
- **Different value props**: API vs Analytics vs Support
- **Tax categories**: Software vs Services vs Hardware
- **Feature access**: Basic API vs Premium Analytics
- **Business reporting**: Revenue por tipo de producto

### **Nivel 2: List Prices (Planes comerciales oficiales)**
```
Product: "API Platform"
├── List Price: "Starter Plan" → $50/mes, 10K calls incluidas
├── List Price: "Professional Plan" → $200/mes, 100K calls incluidas
├── List Price: "Enterprise Plan" → $500/mes, 1M calls incluidas
└── List Price: "Pay-per-use" → $0.10 per call, sin mínimo
```

**¿Por qué list prices como source of truth?**
- **Sales clarity**: Precio oficial para citar a prospects
- **Pricing strategy**: Starter → Professional → Enterprise progression
- **Market positioning**: Premium vs discount tiers claros
- **Analytics foundation**: Baseline para medir discounts

### **Nivel 3: Price Variants (Customizaciones por cliente)**
```
List Price: "Enterprise Plan" ($500/mes)
├── Price Variant: "Acme Corp" → 20% discount = $400/mes
├── Price Variant: "MercadoLibre" → Custom terms = $500/mes, 2M calls
├── Price Variant: "Startup Beta" → 50% discount = $250/mes
└── Price Variant: "Enterprise Plus" → 10% markup = $550/mes
```

**¿Por qué variants separadas del list price?**
- **Preserve analytics**: Sabes que Acme Corp tiene 20% off Enterprise
- **Sales negotiations**: Personalización sin romper estructura
- **Approval workflows**: Descuentos >25% requieren manager approval
- **Customer insights**: Tracking de discount adoption por segment

### **Nivel 4: Agreements (Contratos del cliente)**
```
Agreement: "Acme Corp - Q1 2025 Contract"
├── Agreement Item 1: API Platform → Enterprise Plan (con 20% variant)
├── Agreement Item 2: Analytics Dashboard → Professional Plan (sin variant)
├── Agreement Item 3: Premium Support → Custom pricing
└── Agreement Discount: 5% additional Q1 promo
```

**¿Por qué agreements combinan múltiples productos?**
- **Real contracts**: Clientes compran bundles, no productos aislados
- **Promotion flexibility**: Descuentos temporales sin afectar pricing base
- **Contract phases**: Ramp-up pricing, renewals, expansions
- **Billing automation**: Un contract → múltiples receipt lines

---

## 💼 **Casos de Uso Empresariales**

### **Caso 1: SaaS Platform con Freemium (Stripe-like)**
```
Company: "DevTools Inc" - API development platform

Product Catalog:
├── Product: "API Platform"
│   ├── List Price: "Free Plan" → $0/mes, 1K requests
│   ├── List Price: "Starter Plan" → $29/mes, 10K requests
│   ├── List Price: "Pro Plan" → $99/mes, 100K requests
│   └── List Price: "Enterprise" → $299/mes, 1M requests
├── Product: "Analytics Add-on"
│   ├── List Price: "Basic Analytics" → $19/mes
│   └── List Price: "Advanced Analytics" → $49/mes
└── Product: "Priority Support"
    └── List Price: "24/7 Support" → $199/mes

Customer Journey:
1. Startup "CodeCorp" starts with Free Plan
2. Growth → Upgrade to Pro Plan ($99/mes)
3. Enterprise needs → Custom variant "CodeCorp Enterprise" (20% discount) = $239/mes
4. Add Analytics → Basic Analytics $19/mes
5. Final contract: $258/mes (Pro + Analytics con discount)

Result: Clear progression path, discount tracking, bundle flexibility
```

### **Caso 2: Payment Processor (Complex percentage-based)**
```
Company: "PayFlow" - Payment processing platform

Product Catalog:
├── Product: "Payment Processing"
│   ├── List Price: "Standard Rate" → 2.9% + $0.30 per transaction
│   ├── List Price: "Volume Rate" → 2.7% + $0.25 per transaction
│   └── List Price: "Enterprise Rate" → 2.5% + $0.20 per transaction
├── Product: "International Processing"
│   └── List Price: "Cross-border" → 3.5% + $0.50 per transaction
└── Product: "Chargeback Protection"
    └── List Price: "Chargeback Insurance" → $15 per chargeback

Customer: "E-commerce Giant"
1. Starts with Standard Rate (2.9% + $0.30)
2. Volume growth → Negotiates custom variant:
   ├── "Giant Custom" → 2.3% + $0.15 (better than Enterprise)
   ├── Approval: VP Sales approves volume commitment
   └── Terms: Minimum $100K monthly volume
3. Adds International + Chargeback Protection
4. Contract: Multi-product with volume commitments

Result: Complex percentage pricing with volume incentives
```

### **Caso 3: AI/ML Platform (Usage + Seats hybrid)**
```
Company: "AIFlow" - Machine learning platform

Product Catalog:
├── Product: "ML Compute"
│   ├── List Price: "On-demand" → $0.50 per GPU hour
│   ├── List Price: "Reserved" → $300/mes por GPU reservada
│   └── List Price: "Spot Pricing" → $0.20 per GPU hour (variable)
├── Product: "Data Scientists Seats"
│   ├── List Price: "Standard Seat" → $99/mes per data scientist
│   └── List Price: "Premium Seat" → $199/mes per senior data scientist
└── Product: "Model Hosting"
    ├── List Price: "Basic Hosting" → $50/mes per model
    └── List Price: "Enterprise Hosting" → $200/mes per model + SLA

Customer: "FinTech Startup"
1. Starts: 2 Premium Seats ($398/mes) + On-demand compute
2. Growth: Adds Reserved GPU (1 unit = $300/mes)
3. Production: Model Hosting for 3 models ($150/mes)
4. Scale: Custom variant for seats:
   ├── "FinTech Volume" → $150/seat (25% discount on Premium)
   ├── Justification: Annual commitment 10+ seats
   └── Total: 10 seats × $150 + infrastructure = $1,950/mes

Result: Hybrid seat + usage model with volume incentives
```

---

## 💰 **Los 9 Modelos de Pricing Implementados**

### **1. Fixed/Subscription Pricing**
```typescript
// Suscripción mensual tradicional
{
  pricingModel: "fixed",
  unitAmount: 50000,        // $500/mes en centavos
  billingInterval: "monthly",
  billInAdvance: false      // Arrears (cobrar después del uso)
}

// One-time setup fee
{
  pricingModel: "fixed",
  unitAmount: 250000,       // $2,500 único en centavos
  billingInterval: "one_time",
  billInAdvance: true       // Advance (cobrar al inicio)
}
```

### **2. Linear Usage-based Pricing**
```typescript
// Per-unit simple
{
  pricingModel: "per_unit",
  unitAmount: 1000,         // $0.10 por call en centavos
  usageMetricId: "api-calls-uuid",
  includedUnits: 1000       // 1,000 llamadas gratis
}

// Cálculo: 1,250 calls - 1,000 incluidas = 250 × $0.10 = $25
```

### **3. Percentage-based Pricing**
```typescript
// Percentage simple
{
  pricingModel: "per_unit",
  isPercentageBased: true,
  percentageRate: 290,      // 2.9% en basis points
  usageMetricId: "payment-amount-uuid"
}

// Percentage con thresholds (payment processing)
{
  pricingModel: "per_unit",
  isPercentageBased: true,
  percentageRate: 290,      // 2.9%
  minFeePerUnit: 30,        // $0.30 mínimo por transacción
  maxFeePerUnit: 1000,      // $10.00 máximo por transacción
  usageMetricId: "payment-amount-uuid"
}

// Ejemplos:
// $10 payment: 2.9% = $0.29 → $0.30 (mínimo aplicado)
// $100 payment: 2.9% = $2.90 → $2.90
// $500 payment: 2.9% = $14.50 → $10.00 (máximo aplicado)
```

### **4. Volume Tiers (Solo tier actual)**
Cliente paga únicamente la tarifa de la tier donde cae su consumo.

```typescript
// Price variant
{
  pricingModel: "tiered",
  tierType: "volume",       // Solo tier actual
  usageMetricId: "api-calls-uuid"
}

// Tiers (entidad separada)
price_variant_tier: [
  {
    tierOrder: 1, upTo: 100,
    unitAmount: 100,          // $1.00 per unit
    flatFee: 2000            // + $20 flat fee
  },
  {
    tierOrder: 2, upTo: null, // Ilimitado
    unitAmount: 75,           // $0.75 per unit
    flatFee: 5000            // + $50 flat fee
  }
]

// Cálculo para 125 units:
// Cae en Tier 2: 125 × $0.75 + $50 = $143.75
```

### **5. Graduated Tiers (Acumulativo)**
Como impuestos progresivos: cliente paga acumulando tramos.

```typescript
// Price variant
{
  pricingModel: "tiered",
  tierType: "graduated",    // Acumulativo
  usageMetricId: "storage-gb-uuid"
}

// Tiers
price_variant_tier: [
  {
    tierOrder: 1, upTo: 100,
    unitAmount: 100,          // Primeros 100 GB @ $1.00
    flatFee: 0
  },
  {
    tierOrder: 2, upTo: null,
    unitAmount: 75,           // Siguientes GB @ $0.75
    flatFee: 0
  }
]

// Cálculo para 125 GB:
// Tier 1: 100 × $1.00 = $100.00
// Tier 2: 25 × $0.75 = $18.75
// Total: $118.75
```

### **6. Packaged/Stair-step Pricing**
Venta de paquetes de unidades a precio fijo.

```typescript
// Ejemplo: $10 cada 250 SMS
{
  pricingModel: "packaged",
  unitAmount: 1000,         // $10 por paquete en centavos
  packageSize: 250,         // 250 SMS por paquete
  usageMetricId: "sms-messages-uuid"
}

// Cálculo para 600 SMS:
// ceil(600/250) = 3 paquetes × $10 = $30
```

### **7. Seat-based Pricing**
```typescript
// Linear seat pricing
{
  pricingModel: "per_unit",
  unitAmount: 5000,         // $50 por seat en centavos
  currency: "USD",
  billingInterval: "monthly",
  quantitySource: "seat_balance" // Usa seat count en lugar de usage
}

// Graduated seat pricing (via tiers)
{
  pricingModel: "tiered",
  tierType: "graduated",
  quantitySource: "seat_balance"
}

// En agreement_item:
// seat_type_id → seat_type.id (admin_seats, editor_seats, etc.)
```

### **8. Minimum Fees**
Compromiso mínimo que aplica sobre uno o varios precios de uso.

```typescript
// Price variant de uso
{
  id: "api-usage-variant",
  pricingModel: "per_unit",
  unitAmount: 1000,         // $0.10 per call
  usageMetricId: "api-calls-uuid"
}

// Minimum fee (entidad separada)
{
  name: "Monthly API Minimum",
  minimumAmount: 50000,     // $500 mínimo en centavos
  currency: "USD",
  billingInterval: "monthly"
}

// Relación many-to-many
minimum_fee_price_variant: {
  minimumFeeId: "monthly-minimum-uuid",
  priceVariantId: "api-usage-variant"
}

// Billing automático:
// 3,500 calls × $0.10 = $350 (uso real)
// Mínimo: $500
// True-up: $500 - $350 = $150
// Factura: $350 (uso) + $150 (true-up) = $500 total
```

### **9. Credit Burndown**
Créditos prepagados que el cliente consume.

```typescript
{
  pricingModel: "per_unit",
  enableCreditBurndown: true,
  creditBurndownRate: 10,   // 1 unit = 10 créditos
  usageMetricId: "api-calls-uuid"
}

// Configuración inicial (via credit_grant):
// $250 → 2,500 créditos disponibles (250 × 10)

// Consumo mensual:
// 300 API calls = 300 × 10 = 3,000 créditos necesarios
// Créditos disponibles: 2,500
// Overage: 500 créditos = 50 units × $0.10 = $5.00 charge
```

### **🔥 Ventajas vs Sequence/Stripe:**

**✅ Tiers Normalizados** (vs JSON anidado):
```sql
-- Sequence: JSON dentro de price variant
tiers: [{"up_to": 100, "amount": 1000}]

-- Commet: Entidad separada
price_variant_tier:
├── tier_order: 1
├── up_to: 100
├── unit_amount: 1000
└── flat_fee: 2000
```

**Benefits:**
- Queries más eficientes con índices
- Validaciones a nivel DB
- Fácil agregar campos sin migrar JSON
- Audit trail granular por tier

**✅ Multi-producto Minimum Fees** (vs single-product):
- Un minimum fee puede aplicar a múltiples price variants
- Relación many-to-many vs 1-to-1
- Perfecto para enterprise contracts con múltiples productos

**✅ Credit Burndown completo**:
- Rollover de créditos entre períodos
- Burn rates configurables
- Integration con billing engine automática

---

## ⚙️ **Business Rules & Decision Matrix**

### **¿Cuándo crear nuevo Product?**
```
Decision Tree:
1. Different service/feature → NEW product (API vs Analytics vs Support)
2. Different tax category → NEW product (Software vs Hardware vs Services)
3. Different value proposition → NEW product (Core vs Add-on vs Premium)
4. Different pricing model → SAME product, different list price
5. Different customer segment → SAME product, different list price
```

### **¿Cuándo crear nuevo List Price?**
```
List Price Creation:
1. Different pricing model → NEW list price (fixed vs usage vs tiers)
2. Different market segment → NEW list price (SMB vs Enterprise)
3. Different commitment level → NEW list price (monthly vs annual)
4. Different included units → NEW list price (10K vs 100K vs 1M calls)
5. Price updates → UPDATE existing list price (preserve history)
```

### **¿Cuándo crear Price Variant?**
```
Price Variant Logic:
1. Customer-specific discount → CREATE variant (Acme Corp 20% off)
2. Custom terms → CREATE variant (más units, different currency)
3. A/B testing → CREATE variant (test different pricing)
4. Negotiated pricing → CREATE variant (enterprise deals)
5. Temporary promotions → USE agreement discounts instead
```

### **¿Pricing model selection?**
```
Pricing Model Decision:
1. Predictable revenue needed → Fixed pricing ($500/mes)
2. Usage varies significantly → Per-unit pricing ($0.10/call)
3. User-based product → Seat pricing ($50/user/mes)
4. Volume incentives → Tiered pricing (volume or graduated)
5. Complex enterprise → Hybrid (fixed + seats + usage)
```

---

# Referencia: Pricing Models - Commet Billing Platform

## 🎯 **Modelos de Pricing Sequence-like Completos**

Commet soporta **TODOS** los modelos de pricing de Sequence, adaptados para LATAM con mejoras arquitectónicas.

## 1️⃣ **Fixed/Subscription Pricing**

### **Fixed Recurring**
Suscripciones tradicionales SaaS con pricing predecible.

```typescript
// Ejemplo: Slack Premium $500/mes
{
  pricingModel: "fixed",
  unitAmount: 50000,        // $500/mes en centavos
  billingInterval: "monthly",
  billInAdvance: false      // Arrears (cobrar después del consumo)
}
```

### **One-time Fees**
Cobros únicos para onboarding, setup, consulting.

```typescript
// Ejemplo: Onboarding $2,500 único
{
  pricingModel: "fixed",
  unitAmount: 250000,       // $2,500 en centavos
  billingInterval: "one_time",
  billInAdvance: true       // Advance (cobrar al inicio)
}
```

## 2️⃣ **Linear Usage-based Pricing**

### **Linear per Unit**
Tarifa única por unidad consumida.

```typescript
// Ejemplo: $0.10 por API call
{
  pricingModel: "per_unit",
  unitAmount: 1000,         // $0.10 por call en centavos
  usageMetricId: "api-calls-uuid",
  includedUnits: 1000       // 1,000 llamadas gratis
}

// Cálculo: 1,250 calls - 1,000 incluidas = 250 × $0.10 = $25
```

### **Linear Percentage**
Porcentaje del monto de cada evento.

```typescript
// Ejemplo: 0.5% sobre monto de pago
{
  pricingModel: "per_unit",
  isPercentageBased: true,
  percentageRate: 50,       // 0.5% en basis points
  unitAmount: 0,            // Sin fee fijo
  usageMetricId: "payment-amount-uuid"
}

// Cálculo: $1,000 payment × 0.5% = $5
```

### **Linear % con Thresholds**
Porcentaje con mínimo y máximo por evento para previsibilidad.

```typescript
// Ejemplo: 2% con mín $1 y máx $10
{
  pricingModel: "per_unit",
  isPercentageBased: true,
  percentageRate: 200,      // 2% en basis points
  minFeePerUnit: 100,       // $1 mínimo en centavos
  maxFeePerUnit: 1000,      // $10 máximo en centavos
  usageMetricId: "payment-amount-uuid"
}

// Ejemplos:
// $25 payment: 2% = $0.50 → $1.00 (mínimo aplicado)
// $100 payment: 2% = $2.00 → $2.00
// $750 payment: 2% = $15.00 → $10.00 (máximo aplicado)
```

### **Linear % + Fixed Fee**
Porcentaje más fee fijo por evento (ambos cobrados).

```typescript
// Ejemplo: 2.9% + $0.30 por transacción (Stripe-like)
{
  pricingModel: "per_unit",
  isPercentageBased: true,
  percentageRate: 290,      // 2.9% en basis points
  fixedFeePerUnit: 30,      // $0.30 fijo en centavos (SIEMPRE agregado)
  usageMetricId: "payment-amount-uuid"
}

// Ejemplos:
// $10 payment: 2.9% = $0.29 + $0.30 = $0.59 total
// $100 payment: 2.9% = $2.90 + $0.30 = $3.20 total
// $500 payment: 2.9% = $14.50 + $0.30 = $14.80 total

// DIFERENCIA vs Min/Max:
// Min/Max: Math.max(percentage, minimum)
// Percentage + Fixed: percentage + fixed (ambos siempre)
```

## 3️⃣ **Volume Tiers (Solo Tier Actual)**

Cliente paga únicamente la tarifa de la tier donde cae su consumo.

```typescript
// Price Variant
{
  pricingModel: "tiered",
  tierType: "volume",       // Solo tier actual
  usageMetricId: "api-calls-uuid"
}

// Tiers (entidad separada)
price_variant_tier: [
  {
    tierOrder: 1, upTo: 100,
    unitAmount: 100,          // $1 per unit
    flatFee: 2000            // + $20 flat fee
  },
  {
    tierOrder: 2, upTo: null, // Ilimitado
    unitAmount: 75,           // $0.75 per unit
    flatFee: 5000            // + $50 flat fee
  }
]

// Cálculo para 125 units:
// Cae en Tier 2: 125 × $0.75 + $50 = $143.75
```

## 4️⃣ **Graduated Tiers (Acumulativo)**

Como impuestos progresivos: cliente paga acumulando tramos.

```typescript
// Price Variant
{
  pricingModel: "tiered",
  tierType: "graduated",    // Acumulativo
  usageMetricId: "storage-gb-uuid"
}

// Tiers
price_variant_tier: [
  {
    tierOrder: 1, upTo: 100,
    unitAmount: 100,          // Primeros 100 GB @ $1
    flatFee: 0
  },
  {
    tierOrder: 2, upTo: null,
    unitAmount: 75,           // Siguientes GB @ $0.75
    flatFee: 0
  }
]

// Cálculo para 125 GB:
// Tier 1: 100 × $1.00 = $100.00
// Tier 2: 25 × $0.75 = $18.75
// Total: $118.75
```

## 5️⃣ **Packaged/Stair-step Pricing**

Venta de paquetes de unidades a precio fijo.

```typescript
// Ejemplo: $10 cada 250 SMS
{
  pricingModel: "packaged",
  unitAmount: 1000,         // $10 por paquete en centavos
  packageSize: 250,         // 250 SMS por paquete
  usageMetricId: "sms-messages-uuid"
}

// Cálculo para 600 SMS:
// ceil(600/250) = 3 paquetes × $10 = $30
```

## 6️⃣ **Seat-based Pricing**

### **Linear Seat-based**
Mismo precio por cada asiento.

```typescript
{
  pricingModel: "per_unit",
  unitAmount: 1500,         // £15 por seat en centavos
  currency: "GBP",
  billingInterval: "monthly",
  billInAdvance: false,     // Arrears (cobrar al final)
  quantitySource: "seat_balance" // Usa seat count
}

// Cálculo: 20 seats × £15 = £300
```

### **Graduated Seat-based**
Precio por asiento cambia por tramos.

```typescript
// Price Variant
{
  pricingModel: "tiered",
  tierType: "graduated",
  quantitySource: "seat_balance"
}

// Tiers
price_variant_tier: [
  {
    tierOrder: 1, upTo: 15,
    unitAmount: 1200,         // Primeros 15 @ £12
    flatFee: 0
  },
  {
    tierOrder: 2, upTo: null,
    unitAmount: 1500,         // Resto @ £15
    flatFee: 0
  }
]

// Cálculo para 20 seats:
// Tier 1: 15 × £12 = £180
// Tier 2: 5 × £15 = £75
// Total: £255
```

## 7️⃣ **Minimum Fees**

Compromiso mínimo que aplica sobre uno o varios precios de uso.

```typescript
// Price Variant de uso
{
  id: "api-usage-variant",
  pricingModel: "per_unit",
  unitAmount: 1000,         // $0.10 per call
  usageMetricId: "api-calls-uuid"
}

// Minimum Fee (entidad separada)
{
  name: "Monthly API Minimum",
  minimumAmount: 50000,     // $500 mínimo en centavos
  currency: "USD",
  billingInterval: "monthly"
}

// Relación many-to-many
minimum_fee_price_variant: {
  minimumFeeId: "monthly-minimum-uuid",
  priceVariantId: "api-usage-variant"
}

// Cálculo automático:
// 3,500 calls × $0.10 = $350 (uso real)
// Mínimo: $500
// True-up: $500 - $350 = $150
// Factura: $350 (uso) + $150 (true-up) = $500 total
```

## 8️⃣ **Credit Burndown**

Créditos prepagados que el cliente consume.

```typescript
{
  pricingModel: "per_unit",
  enableCreditBurndown: true,
  creditBurndownRate: 10,   // 1 unit = 10 créditos
  usageMetricId: "api-calls-uuid"
}

// Configuración inicial (via credit_grant):
// £250 → 1500 créditos disponibles

// Consumo mensual:
// 1600 API calls = 1600 × 10 = 16,000 créditos necesarios
// Créditos disponibles: 15,000
// Overage: 1,000 créditos = 100 units × $0.10 = $10
```

## 🏗️ **Arquitectura de Tiers (Ventaja vs Sequence)**

### **Tiers como Entidad Separada**

**✅ VENTAJAS vs JSON anidado:**
- **Normalización**: Cada tier es un registro independiente
- **Queries eficientes**: `SELECT * FROM price_variant_tier WHERE priceVariantId = ? ORDER BY tierOrder`
- **Validaciones DB**: Constraints en lugar de validaciones JSON
- **Escalabilidad**: Fácil agregar campos sin migrar JSON
- **Audit trail**: Cambios individuales por tier
- **Reporting**: Queries directas sobre rangos

### **Estructura**
```sql
price_variant (1) → price_variant_tier (N)
├── tierOrder: 1, 2, 3... (orden de aplicación)
├── upTo: 100, 500, null (null = ilimitado)
├── unitAmount: precio por unidad en centavos
└── flatFee: fee fijo por tier en centavos
```

### **Ejemplo de Query**
```typescript
// Obtener tiers ordenados
const tiers = await db
  .select()
  .from(price_variant_tier)
  .where(eq(price_variant_tier.priceVariantId, variantId))
  .orderBy(price_variant_tier.tierOrder);

// Billing engine: calcular precio por tiers
function calculateTieredPrice(
  quantity: number,
  tiers: PriceVariantTier[],
  tierType: "volume" | "graduated"
) {
  if (tierType === "volume") {
    // Cliente paga solo la tier donde cae
    const tier = tiers.find(t => !t.upTo || quantity <= t.upTo);
    return quantity * tier.unitAmount + tier.flatFee;
  } else {
    // Graduated: acumulativo como impuestos
    let total = 0;
    let remaining = quantity;
    for (const tier of tiers) {
      const tierUnits = tier.upTo ? Math.min(remaining, tier.upTo) : remaining;
      total += tierUnits * tier.unitAmount + tier.flatFee;
      remaining -= tierUnits;
      if (remaining <= 0) break;
    }
    return total;
  }
}
```

## 🎯 **Casos de Uso Soportados**

### **1. SaaS Tradicional**
- **Estructura**: Fixed recurring $500/mes + Admin seats $50/cada uno
- **Ejemplo**: Slack, Notion, Linear
- **Configuración**: 2 price variants en mismo schedule

### **2. API Platforms**
- **Estructura**: Usage-based con tiers complejos + minimum fees
- **Ejemplo**: Stripe, Twilio, SendGrid
- **Configuración**: Graduated tiers + monthly minimum

### **3. Marketplaces**
- **Estructura**: Percentage-based con thresholds
- **Ejemplo**: Payment processors, e-commerce platforms
- **Configuración**: 2.9% + $0.30 con caps

### **4. Enterprise Híbrido**
- **Estructura**: Fixed base + seats + usage + minimum fees
- **Ejemplo**: Salesforce, AWS, Azure
- **Configuración**: Multiple price variants + minimum fee multi-producto

### **5. Freemium con Overages**
- **Estructura**: Base gratuita + overage por uso
- **Ejemplo**: Vercel, Netlify, Heroku
- **Configuración**: includedUnits + per-unit overage

## 📊 **Comparación con Sequence**

| Característica | Sequence | Commet |
|----------------|----------|--------|
| **Tiers** | JSON anidado | Entidad separada ✅ |
| **Minimum fees** | Básico | Multi-producto ✅ |
| **Type safety** | Parcial | Completo (TypeScript) ✅ |
| **LATAM compliance** | No | Nativo ✅ |
| **Self-hosted** | No | Sí ✅ |
| **Audit trail** | Básico | Granular por tier ✅ |
| **Performance** | JSON parsing | Queries optimizadas ✅ |

**Commet = Sequence + mejoras arquitectónicas + enfoque LATAM**
