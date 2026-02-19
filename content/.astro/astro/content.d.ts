declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"learn": {
"conditional-vs-future.mdx": {
	id: "conditional-vs-future.mdx";
  slug: "conditional-vs-future";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"false-cognates-spanish.mdx": {
	id: "false-cognates-spanish.mdx";
  slug: "false-cognates-spanish";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"ir-vs-venir.mdx": {
	id: "ir-vs-venir.mdx";
  slug: "ir-vs-venir";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"llevar-vs-traer.mdx": {
	id: "llevar-vs-traer.mdx";
  slug: "llevar-vs-traer";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"pedir-vs-preguntar.mdx": {
	id: "pedir-vs-preguntar.mdx";
  slug: "pedir-vs-preguntar";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"por-vs-para.mdx": {
	id: "por-vs-para.mdx";
  slug: "por-vs-para";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"present-perfect-vs-preterite.mdx": {
	id: "present-perfect-vs-preterite.mdx";
  slug: "present-perfect-vs-preterite";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"preterite-vs-imperfect.mdx": {
	id: "preterite-vs-imperfect.mdx";
  slug: "preterite-vs-imperfect";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"reflexive-verbs-explained.mdx": {
	id: "reflexive-verbs-explained.mdx";
  slug: "reflexive-verbs-explained";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"saber-vs-conocer.mdx": {
	id: "saber-vs-conocer.mdx";
  slug: "saber-vs-conocer";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"ser-vs-estar.mdx": {
	id: "ser-vs-estar.mdx";
  slug: "ser-vs-estar";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"ser-vs-tener-age.mdx": {
	id: "ser-vs-tener-age.mdx";
  slug: "ser-vs-tener-age";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"spanish-commands-imperative.mdx": {
	id: "spanish-commands-imperative.mdx";
  slug: "spanish-commands-imperative";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"spanish-subjunctive-explained.mdx": {
	id: "spanish-subjunctive-explained.mdx";
  slug: "spanish-subjunctive-explained";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"tu-vs-usted.mdx": {
	id: "tu-vs-usted.mdx";
  slug: "tu-vs-usted";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"vosotros-vs-ustedes.mdx": {
	id: "vosotros-vs-ustedes.mdx";
  slug: "vosotros-vs-ustedes";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
