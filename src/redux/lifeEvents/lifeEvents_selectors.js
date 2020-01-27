import {createSelector} from "reselect"

const lifeEvents_reducer = state => state.lifeEvents_reducer

export const lifeEventsArray = createSelector(
    [lifeEvents_reducer], 
    (lifeEvents_reducer) => Object.values(lifeEvents_reducer)
)

export const lifeEvents = createSelector(
    [lifeEvents_reducer], 
    (lifeEvents_reducer) => Object.values(lifeEvents_reducer).filter(d => d.name.length > 2)
)