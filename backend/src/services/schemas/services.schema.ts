// schemas/service.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ServiceDocument = HydratedDocument<Service>;

@Schema( { _id: false } )
class Overview
{
    @Prop( { required: true } )
    shortDescription!: string;

    @Prop( { required: true } )
    description: string;
}

const OverviewSchema = SchemaFactory.createForClass( Overview );

@Schema( { _id: false } )
class Image
{
    @Prop( { required: true } )
    url: string;

    @Prop( { required: true } )
    alt: string;
}

const ImageSchema = SchemaFactory.createForClass( Image );

@Schema( { _id: false } )
class Video
{
    @Prop()
    url: string;

    @Prop()
    thumbnail: string;

    @Prop()
    title: string;
}

const VideoSchema = SchemaFactory.createForClass( Video );

@Schema( { _id: false } )
class Seo
{
    @Prop()
    metaTitle: string;

    @Prop()
    metaDescription: string;

    @Prop( { type: [ String ], default: [] } )
    keywords: string[];

    @Prop()
    canonicalUrl: string;

    @Prop()
    ogImage: string;

    @Prop( { default: 'index,follow' } )
    robots: string;
}

const SeoSchema = SchemaFactory.createForClass( Seo );

@Schema( { timestamps: true } )
export class Service
{
    @Prop( { required: true, unique: true } )
    slug: string;

    @Prop( { required: true } )
    name: string;

    @Prop( { type: OverviewSchema, required: true } )
    overview: Overview;

    @Prop( { required: true } )
    categoryId: string;

    @Prop( { type: ImageSchema, required: true } )
    image: Image;

    @Prop( { type: ImageSchema, required: true } )
    banner: Image;

    @Prop( { type: VideoSchema } )
    video: Video;

    @Prop( { type: [ String ], default: [] } )
    serviceTypes: string[];

    @Prop( { type: [ String ], default: [] } )
    technologyIds: string[];

    @Prop( { type: [ String ], default: [] } )
    integrationIds: string[];

    @Prop( { type: [ String ], default: [] } )
    featureIds: string[];

    @Prop( { type: [ String ], default: [] } )
    deploymentPlatformIds: string[];

    @Prop( { type: [ String ], default: [] } )
    supportedPlatforms: string[];

    @Prop( { type: SeoSchema } )
    seo: Seo;

    @Prop( { default: false } )
    featured: boolean;

    @Prop( { default: 'draft' } )
    status: string;

    @Prop( { default: true } )
    active: boolean;
}

export const ServiceSchema = SchemaFactory.createForClass( Service );