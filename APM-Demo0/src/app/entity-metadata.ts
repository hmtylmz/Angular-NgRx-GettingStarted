import { EntityDataModuleConfig, EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Item: {}
};

const pluralNames = { Item: 'Items' };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
