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
"acabar-vs-terminar.mdx": {
	id: "acabar-vs-terminar.mdx";
  slug: "acabar-vs-terminar";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"common-irregular-verbs.mdx": {
	id: "common-irregular-verbs.mdx";
  slug: "common-irregular-verbs";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"conditional-vs-future.mdx": {
	id: "conditional-vs-future.mdx";
  slug: "conditional-vs-future";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"dejar-vs-salir.mdx": {
	id: "dejar-vs-salir.mdx";
  slug: "dejar-vs-salir";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"escuchar-vs-oir.mdx": {
	id: "escuchar-vs-oir.mdx";
  slug: "escuchar-vs-oir";
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
"gastar-vs-pasar.mdx": {
	id: "gastar-vs-pasar.mdx";
  slug: "gastar-vs-pasar";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"gustar-and-similar-verbs.mdx": {
	id: "gustar-and-similar-verbs.mdx";
  slug: "gustar-and-similar-verbs";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"haber-vs-tener.mdx": {
	id: "haber-vs-tener.mdx";
  slug: "haber-vs-tener";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"how-to-practice-spanish-conjugations.mdx": {
	id: "how-to-practice-spanish-conjugations.mdx";
  slug: "how-to-practice-spanish-conjugations";
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
"latin-america-vs-spain-vocabulary.mdx": {
	id: "latin-america-vs-spain-vocabulary.mdx";
  slug: "latin-america-vs-spain-vocabulary";
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
"mirar-vs-ver.mdx": {
	id: "mirar-vs-ver.mdx";
  slug: "mirar-vs-ver";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"most-common-spanish-verbs.mdx": {
	id: "most-common-spanish-verbs.mdx";
  slug: "most-common-spanish-verbs";
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
"pensar-vs-creer.mdx": {
	id: "pensar-vs-creer.mdx";
  slug: "pensar-vs-creer";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"poder-vs-saber.mdx": {
	id: "poder-vs-saber.mdx";
  slug: "poder-vs-saber";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"por-que-porque-porqué.mdx": {
	id: "por-que-porque-porqué.mdx";
  slug: "por-que-porque-porqué";
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
"quedar-vs-quedarse.mdx": {
	id: "quedar-vs-quedarse.mdx";
  slug: "quedar-vs-quedarse";
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
"sentir-vs-sentirse.mdx": {
	id: "sentir-vs-sentirse.mdx";
  slug: "sentir-vs-sentirse";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"ser-estar-adjectives-that-change-meaning.mdx": {
	id: "ser-estar-adjectives-that-change-meaning.mdx";
  slug: "ser-estar-adjectives-that-change-meaning";
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
"si-clauses.mdx": {
	id: "si-clauses.mdx";
  slug: "si-clauses";
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
"spanish-diminutives.mdx": {
	id: "spanish-diminutives.mdx";
  slug: "spanish-diminutives";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"spanish-future-of-probability.mdx": {
	id: "spanish-future-of-probability.mdx";
  slug: "spanish-future-of-probability";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"spanish-infinitive-vs-subjunctive.mdx": {
	id: "spanish-infinitive-vs-subjunctive.mdx";
  slug: "spanish-infinitive-vs-subjunctive";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"spanish-object-pronouns.mdx": {
	id: "spanish-object-pronouns.mdx";
  slug: "spanish-object-pronouns";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"spanish-passive-voice.mdx": {
	id: "spanish-passive-voice.mdx";
  slug: "spanish-passive-voice";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"spanish-past-participle.mdx": {
	id: "spanish-past-participle.mdx";
  slug: "spanish-past-participle";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"spanish-pluperfect.mdx": {
	id: "spanish-pluperfect.mdx";
  slug: "spanish-pluperfect";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"spanish-progressive-tenses.mdx": {
	id: "spanish-progressive-tenses.mdx";
  slug: "spanish-progressive-tenses";
  body: string;
  collection: "learn";
  data: InferEntrySchema<"learn">
} & { render(): Render[".mdx"] };
"spanish-se-uses.mdx": {
	id: "spanish-se-uses.mdx";
  slug: "spanish-se-uses";
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
"spanish-verb-conjugation-patterns.mdx": {
	id: "spanish-verb-conjugation-patterns.mdx";
  slug: "spanish-verb-conjugation-patterns";
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
"volver-vs-regresar.mdx": {
	id: "volver-vs-regresar.mdx";
  slug: "volver-vs-regresar";
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
