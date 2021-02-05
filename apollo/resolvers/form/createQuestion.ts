import { GQLContext } from '@/apollo/interfaces';
import { ensureUserOwnedWorkspace } from '@/db/workspace/queryHelpers';
import { QuestionCreateParams } from '@/models/question';
import { formQuestionFactory } from 'factories/formQuestionFactory';

interface Args {
  workspaceId: string;
  formId: string;
  question: QuestionCreateParams;
}

export const createQuestion = async (
  _: Record<string, never>,
  { workspaceId, formId, question }: Args,
  { db, session }: GQLContext,
) => {
  const { id: userId } = session.user;
  const workspace = await ensureUserOwnedWorkspace({ db, userId, workspaceId });

  workspace.addFormQuestion({
    formId,
    question: formQuestionFactory(question),
  });

  await db.workspaceRepo.commit(workspace);

  return workspace.snapshot();
};
