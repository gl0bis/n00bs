import React, { FC } from 'react';
import Unit from './Unit';
import { Unit as UnitT } from '../../../../darwin-types/game-objects/Unit';
import {
  GameObject,
  ObjectId,
} from '../../../../darwin-types/game-objects/GameObject';
import GAME_OBJECT_TYPES from '../../constants/gameObjects';
import Food from './Food';

type Props = {
  objectIds: ObjectId[];
  objectMap: Record<ObjectId, GameObject>;
  ownUnitId: ObjectId;
  scaleFactor: number;
};

const sortLayerConfig = {
  [GAME_OBJECT_TYPES.UNIT]: 2,
  [GAME_OBJECT_TYPES.FOOD]: 1,
};

const GameObjects: FC<Props> = ({ objectIds, objectMap, scaleFactor }) => (
  <>
    {objectIds
      .map(objectId => objectMap[objectId])
      .sort((a, b) =>
        sortLayerConfig[a.type] > sortLayerConfig[b.type] ? 1 : -1
      )
      .map((gameObject): JSX.Element | null => {
        switch (gameObject.type) {
          case GAME_OBJECT_TYPES.UNIT: {
            const unit = gameObject as UnitT;
            return (
              <Unit
                key={unit.id}
                health={unit.health}
                position={{
                  x: unit.position.x * scaleFactor,
                  y: unit.position.y * scaleFactor,
                }}
              />
            );
          }
          case GAME_OBJECT_TYPES.FOOD: {
            const food = gameObject as UnitT;
            return (
              <Food
                key={food.id}
                position={{
                  x: food.position.x * scaleFactor,
                  y: food.position.y * scaleFactor,
                }}
              />
            );
          }
          default:
            return null;
        }
      })}
  </>
);
export default GameObjects;
