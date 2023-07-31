import { PipelineStage } from 'mongoose';

export interface CreatePagedAggregationPipelineArgs {
  skip: number;
  limit: number;
  preProcessingStages?: PipelineStage[];
  postProcessingStages?: PipelineStage[];
  itemProcessingStages?: PipelineStage.FacetPipelineStage[];
}

export function createPagedAggregationPipeline({
  skip,
  limit,
  preProcessingStages,
  postProcessingStages,
  itemProcessingStages,
}: CreatePagedAggregationPipelineArgs): PipelineStage[] {
  const pipelineStages: PipelineStage[] = [];
  if (preProcessingStages) {
    preProcessingStages.forEach((stage) => pipelineStages.push(stage));
  }

  const itemStages: PipelineStage.FacetPipelineStage[] = [];
  itemStages.push({ $skip: skip });
  itemStages.push({ $limit: limit });

  if (itemProcessingStages) {
    itemProcessingStages.forEach((stage) => itemStages.push(stage));
  }
  const facetStage: PipelineStage.Facet = {
    $facet: {
      items: itemStages,
      total: [{ $count: 'count' }],
    },
  };
  pipelineStages.push(facetStage);
  pipelineStages.push({
    $addFields: {
      total: {
        $cond: {
          if: { $eq: [{ $size: '$total.count' }, 0] },
          then: 0,
          else: { $arrayElemAt: ['$total.count', 0] },
        },
      },
    },
  });

  if (postProcessingStages) {
    postProcessingStages.forEach((stage) => pipelineStages.push(stage));
  }

  return pipelineStages;
}
