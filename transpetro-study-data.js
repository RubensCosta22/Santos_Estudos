import { studyPart1 } from './transpetro-study-part1.js'
import { studyPart2 } from './transpetro-study-part2.js'
import { studyPart3 } from './transpetro-study-part3.js'
import { studyPart4 } from './transpetro-study-part4.js'

export const transpetroStudy = [...studyPart1,...studyPart2,...studyPart3,...studyPart4]
export const findStudyTopic = topic => {
  for(const area of transpetroStudy){
    const section=area.sections.find(s=>s.topic===topic)
    if(section)return {area,section}
  }
  return null
}
