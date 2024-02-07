import {getQuestionSearchJson} from "../../../resources/headers/questionSearchJson.js";
import {getQuestionDetail} from "../question-handler/getQuestionDetail.js";
import {getRandomId} from "#common/utils/question-handler/getRandomId.js";

export async function getQuestionRandom() {
  const id = await getRandomId()
  const base = await fetch('https://leetcode.cn/graphql/', getQuestionSearchJson(id.toString())).then((res) => res.json());
  const slug = base.data.problemsetQuestionList.questions.find((o) => o.frontendQuestionId === id.toString()).titleSlug;
  const question = await getQuestionDetail(slug);
  return question;
}