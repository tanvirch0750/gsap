'use client';

import { Disclosure } from '@headlessui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckIcon, Loader2, SparklesIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import BuildWithAiLoading from '@/components/Projects/BuildWithAiLoading';
import { Button } from '@/components/ui/button';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as UISelect,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { errorToast, successToast } from '@/components/ui/toast';
import {
  P0Bold,
  P1Bold,
  P2Bold,
  P2Medium,
  P3Medium,
  P3Regular,
  P4Bold,
  P4Regular,
} from '@/components/ui/typography';
import { SBSurveyQuestionHook } from '@/features/survey-builder/hook';
import api from '@/lib/api';
import { typeToPlainText } from '@/lib/helpers';
import {
  ArrowRightIcon,
  ArrowsClockwiseIcon,
  ChecksIcon,
} from '@phosphor-icons/react';

export function AddQuestionWithAISheet({ surveyId, existingQuestions = [] }) {
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [addQuestionLoading, setAddQuestionsLoading] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // New state for the 4-step context
  const [currentStep, setCurrentStep] = useState(1);
  const [objective, setObjective] = useState('explore');
  const [objectiveDetails, setObjectiveDetails] = useState('');
  const [insertPosition, setInsertPosition] = useState('end');
  const [insertAfterIndex, setInsertAfterIndex] = useState(null);
  const [questionStyle, setQuestionStyle] = useState('match');
  const [questionCount, setQuestionCount] = useState('1');

  const queryClient = useQueryClient();

  const { mutate: addQuestionsToSurvey } =
    SBSurveyQuestionHook.useAddQuestionsToSurvey({
      onSuccess: (data) => {
        successToast('Questions added successfully.');
        queryClient.invalidateQueries(['survey-builder-questions']);
        setIsAiModalOpen(false);
        setAddQuestionsLoading(false);
      },
      onError: (error) => {
        errorToast('Failed to add questions');
        setAddQuestionsLoading(false);
      },
    });

  useEffect(() => {
    if (isAiModalOpen) {
      setGeneratedQuestions([]);
      setSelectedQuestions([]);
      setIsGenerating(false);
      setCurrentStep(1);
      setObjective('explore');
      setObjectiveDetails('');
      setInsertPosition('end');
      setInsertAfterIndex(null);
      setQuestionStyle('match');
      setQuestionCount('1');
    }
  }, [isAiModalOpen]);

  const handleSelect = ({ checked, q }) => {
    let newSelectedQuestions;
    if (!checked) {
      newSelectedQuestions = selectedQuestions?.filter(
        (qs) => qs.question !== q.question
      );
    } else {
      newSelectedQuestions = [...selectedQuestions, q];
    }
    setSelectedQuestions(newSelectedQuestions);
  };

  const mutateGeneratedAIQuestions = useMutation({
    mutationFn: async (data) => {
      const res = await api.post(
        '/survey-app/survey-manager/survey/generate-ai-questions-v2',
        data
      );
      return res.data.questions;
    },
    onSuccess: (questions) => {
      setGeneratedQuestions(questions);
      setSelectedQuestions(questions);
      successToast('Questions created!');
    },
    onError: () => {
      errorToast('Failed! Try again with better prompt!');
    },
    retry: 3,
  });

  const createAiQuestions = async () => {
    if (objectiveDetails.trim() === '' && objective === 'explore') {
      errorToast('Please add objective details!');
      return;
    }

    const numQuestions =
      questionCount === 'flexible' ? 5 : questionCount === '2-3' ? 3 : 1;

    const data = {
      objective,
      objectiveDetails,
      insertPosition,
      insertAfterIndex,
      questionStyle,
      numberOfQuestions: numQuestions,
      selectedLanguage: 'English',
      existingQuestions: existingQuestions,
    };

    setIsGenerating(true);
    setCurrentStep(2); // Show loading immediately

    try {
      // Use mutateAsync instead of mutate
      const res = await mutateGeneratedAIQuestions.mutateAsync(data);
      setCurrentStep(3); // Show generated questions
    } catch (error) {
      errorToast('Failed! Try again with better prompt!');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddQuestionsToSurvey = () => {
    setAddQuestionsLoading(true);
    addQuestionsToSurvey({
      surveyId,
      questions: selectedQuestions,
      insertPosition,
      insertAfterIndex,
    });
  };

  const handleKeepQuestion = (questionIndex, keep) => {
    const updatedQuestions = [...generatedQuestions];
    if (keep) {
      if (
        !selectedQuestions.find(
          (q) => q.question === updatedQuestions[questionIndex].question
        )
      ) {
        setSelectedQuestions([
          ...selectedQuestions,
          updatedQuestions[questionIndex],
        ]);
      }
    } else {
      setSelectedQuestions(
        selectedQuestions.filter(
          (q) => q.question !== updatedQuestions[questionIndex].question
        )
      );
    }
  };

  const handleConfirmQuestions = () => {
    handleAddQuestionsToSurvey();
  };

  const handleRegenerate = () => {
    setCurrentStep(1);
    setGeneratedQuestions([]);
    setSelectedQuestions([]);
  };

  const renderStep1 = () => (
    <div className="space-y-[52px]">
      {/* Step 1: Objective */}
      <div className="px-6">
        <P0Bold className="mb-3">
          What do you want these new questions to achieve?
        </P0Bold>

        <div className="space-y-3">
          <div className="border border-[#E2E8F0] rounded-[6px] p-[14px] bg-white">
            <div className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-6 h-6 mt-[7px]">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                    objective === 'explore'
                      ? 'border-secondary bg-secondary'
                      : 'border-[#CBD5E1] bg-white'
                  }`}
                  onClick={() => setObjective('explore')}
                >
                  {objective === 'explore' && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <P2Medium className="">Explore new topics</P2Medium>
                <P3Regular
                  className={`${
                    objective === 'explore' ? ' mb-4' : 'mb-0'
                  } text-[#64748B]`}
                >
                  e.g. motivations, barriers, habits
                </P3Regular>
                {objective === 'explore' && (
                  <Textarea
                    placeholder="Add more details. e.g. focus on purchase barriers, satisfaction with delivery"
                    value={objectiveDetails}
                    onChange={(e) => setObjectiveDetails(e.target.value)}
                    className="mt-3 border-[#E2E8F0] rounded-[6px] resize-none text-[13px] placeholder-[#64748B]"
                    rows={1}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="border border-[#E2E8F0] rounded-[6px] p-[14px] bg-white">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-6 h-6 ">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                    objective === 'deeper'
                      ? 'border-secondary bg-secondary'
                      : 'border-[#CBD5E1] bg-white'
                  }`}
                  onClick={() => setObjective('deeper')}
                >
                  {objective === 'deeper' && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <P2Medium className="">Go deeper on an existing theme</P2Medium>
                <P3Regular className=" text-[#64748B]">
                  e.g. awareness, perception, usage, satisfaction
                </P3Regular>
              </div>
            </div>
          </div>

          <div className="border border-[#E2E8F0] rounded-[6px] p-[14px] bg-white">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-6 h-6 ">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                    objective === 'demographics'
                      ? 'border-secondary bg-secondary'
                      : 'border-[#CBD5E1] bg-white'
                  }`}
                  onClick={() => setObjective('demographics')}
                >
                  {objective === 'demographics' && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <P2Medium className="">
                  Add demographics or profiling questions
                </P2Medium>
              </div>
            </div>
          </div>

          <div className="border border-[#E2E8F0] rounded-[6px] p-[14px] bg-white">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-6 h-6">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                    objective === 'balance'
                      ? 'border-secondary bg-secondary'
                      : 'border-[#CBD5E1] bg-white'
                  }`}
                  onClick={() => setObjective('balance')}
                >
                  {objective === 'balance' && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <P2Medium className="">Ensure balance</P2Medium>
                <P3Regular className="text-[#64748B]">
                  e.g. control, comparison, benchmarks
                </P3Regular>
              </div>
            </div>
          </div>

          <div className="border border-[#E2E8F0] rounded-[6px] p-[14px] bg-white">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-6 h-6 ">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                    objective === 'other'
                      ? 'border-secondary bg-secondary'
                      : 'border-[#CBD5E1] bg-white'
                  }`}
                  onClick={() => setObjective('other')}
                >
                  {objective === 'other' && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <P2Medium>Other</P2Medium>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 2: Position */}
      <div className="px-6">
        <P0Bold className="mb-3">Where should these questions fit?</P0Bold>
        <div className="border  rounded-[6px] p-[14px] bg-white mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <P3Medium className="text-[#64748B] mb-[6px]">From</P3Medium>
              <UISelect
                value={insertPosition}
                onValueChange={setInsertPosition}
                className="border"
              >
                <SelectTrigger className="border border-[#E2E8F0] rounded-[6px] h-[36px]">
                  <SelectValue placeholder="Select question" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="start">At the beginning</SelectItem>
                  <SelectItem value="after">After question...</SelectItem>
                  <SelectItem value="end">At the end</SelectItem>
                </SelectContent>
              </UISelect>
            </div>

            <div>
              <P3Medium className="text-[#64748B] mb-[6px]">To</P3Medium>
              {insertPosition === 'after' ? (
                <UISelect
                  value={insertAfterIndex?.toString() || ''}
                  onValueChange={(value) =>
                    setInsertAfterIndex(Number.parseInt(value))
                  }
                >
                  <SelectTrigger className="border border-[#E2E8F0] rounded-[6px] h-[36px]">
                    <SelectValue placeholder="Select question" />
                  </SelectTrigger>
                  <SelectContent>
                    {existingQuestions.map((_, index) => (
                      <SelectItem key={index} value={index.toString()}>
                        Question {index + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </UISelect>
              ) : (
                <UISelect disabled>
                  <SelectTrigger className="border-gray-200 rounded-lg h-12 bg-gray-50">
                    <SelectValue placeholder="Select question" />
                  </SelectTrigger>
                </UISelect>
              )}
            </div>
          </div>
          <div className="flex items-center mt-6">
            <div className="relative mr-2">
              <input
                type="checkbox"
                id="no-specific-place"
                checked={insertPosition === 'end'}
                onChange={(e) => {
                  if (e.target.checked) setInsertPosition('end');
                }}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer ${
                  insertPosition === 'end'
                    ? 'border-secondary bg-secondary'
                    : 'border-gray-300 bg-white'
                }`}
                onClick={() => setInsertPosition('end')}
              >
                {insertPosition === 'end' && (
                  <CheckIcon className="w-3 h-3 text-white" />
                )}
              </div>
            </div>
            <P2Medium
              htmlFor="no-specific-place"
              className="text-[#475569] cursor-pointer"
            >
              No specific place, just add at the end
            </P2Medium>
          </div>
        </div>
      </div>

      {/* Step 3: Style */}
      <div className="px-6">
        <P0Bold className="mb-3">How should these questions be asked?</P0Bold>

        <div className="space-y-3">
          <div className="border border-[#E2E8F0] rounded-[6px] p-[14px] bg-white">
            <div className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-6 h-6 mt-0.5">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                    questionStyle === 'match'
                      ? 'border-secondary bg-secondary'
                      : 'border-[#CBD5E1] bg-white'
                  }`}
                  onClick={() => setQuestionStyle('match')}
                >
                  {questionStyle === 'match' && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <P2Medium className="">
                  Match the existing survey style
                </P2Medium>
                <P3Regular className="text-[#64748B]">Default</P3Regular>
              </div>
            </div>
          </div>

          <div className="border border-[#E2E8F0] rounded-[6px] p-[14px] bg-white">
            <div className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-6 h-6 mt-0.5">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                    questionStyle === 'detailed'
                      ? 'border-secondary bg-secondary'
                      : 'border-[#CBD5E1] bg-white'
                  }`}
                  onClick={() => setQuestionStyle('detailed')}
                >
                  {questionStyle === 'detailed' && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <P2Medium className="">Add more detail</P2Medium>
                <P3Regular className="text-[#64748B]">
                  Longer, more specific
                </P3Regular>
              </div>
            </div>
          </div>

          <div className="border border-[#E2E8F0] rounded-[6px] p-[14px] bg-white">
            <div className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-6 h-6 mt-0.5">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                    questionStyle === 'simple'
                      ? 'border-secondary bg-secondary'
                      : 'border-[#CBD5E1] bg-white'
                  }`}
                  onClick={() => setQuestionStyle('simple')}
                >
                  {questionStyle === 'simple' && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <P2Medium className="">Keep it simple and quick</P2Medium>
                <P3Regular className="text-[#64748B]">
                  Short, easy-to-answer
                </P3Regular>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 4: Count */}
      <div className="px-6">
        <P0Bold className="mb-3">How many questions should we suggest?</P0Bold>

        <div className="space-y-4">
          <div className="border border-[#E2E8F0] rounded-[6px] p-[14px] bg-white">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-6 h-6">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                    questionCount === '1'
                      ? 'border-secondary bg-secondary'
                      : 'border-[#CBD5E1] bg-white'
                  }`}
                  onClick={() => setQuestionCount('1')}
                >
                  {questionCount === '1' && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </div>
              <P2Medium>1</P2Medium>
            </div>
          </div>

          <div className="border border-[#E2E8F0] rounded-[6px] p-[14px] bg-white">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-6 h-6">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                    questionCount === '2-3'
                      ? 'border-secondary bg-secondary'
                      : 'border-[#CBD5E1] bg-white'
                  }`}
                  onClick={() => setQuestionCount('2-3')}
                >
                  {questionCount === '2-3' && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </div>
              <P2Medium>2 - 3</P2Medium>
            </div>
          </div>

          <div className="border border-[#E2E8F0] rounded-[6px] p-[14px] bg-white">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-6 h-6">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                    questionCount === 'flexible'
                      ? 'border-secondary bg-secondary'
                      : 'border-[#CBD5E1] bg-white'
                  }`}
                  onClick={() => setQuestionCount('flexible')}
                >
                  {questionCount === 'flexible' && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </div>
              <P2Medium>Flexible</P2Medium>
            </div>
          </div>
        </div>
      </div>

      <div className=" border-t border-[#E2E8F0] p-6 flex justify-end">
        <Button
          onClick={createAiQuestions}
          className="w-fit bg-secondary hover:bg-secondary"
        >
          Generate Question <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="flex items-center justify-center h-full p-6">
      <div className="flex justify-center flex-col items-center text-center mt-[-80px]">
        <BuildWithAiLoading />
        <h3 className="text-lg font-semibold text-[#334155] mt-6">
          Generating the Questions
        </h3>
        <p className="text-sm text-[#64748B] mt-2">
          Please hold on while our AI generates your questions
        </p>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="">
      <div className="px-6">
        <P0Bold className="mb-3">Questions Preview</P0Bold>
      </div>

      <div className="px-6">
        {generatedQuestions?.map((q, index) => {
          const isSelected = selectedQuestions?.some(
            (qs) => qs?.question === q?.question
          );
          return (
            <div
              key={index}
              className="border border-[#E2E8F0] rounded-[6px]  bg-white overflow-hidden mb-4"
            >
              <Disclosure>
                {({ open }) => (
                  <div>
                    {/* Header Section */}
                    <div className="flex items-start gap-4 p-6">
                      <P4Bold className="flex items-center justify-center w-[16px] h-[16px] bg-[#e2e8f0] rounded-[4px] text-[10px] p-0 m-0 leading-[0px]">
                        {index + 1}
                      </P4Bold>

                      <div className="flex-1 min-w-0">
                        <P4Regular className="uppercase text-[#64748B] tracking-wider mb-1 ">
                          {typeToPlainText(q?.questionType)}
                        </P4Regular>
                        <P2Medium className="">{q?.question}</P2Medium>
                      </div>

                      <Disclosure.Button className="flex items-center justify-center w-5 h-5 text-gray-400 hover:text-[#94A3B8] flex-shrink-0">
                        <IoIosArrowDown
                          className={`${
                            open ? 'rotate-180 transform' : ''
                          } h-5 w-5 transition-transform`}
                        />
                      </Disclosure.Button>
                    </div>

                    {/* Collapsible Answers */}
                    <Disclosure.Panel>
                      {(q?.questionType === 'multiple_choice' ||
                        q?.questionType === 'Boolean') && (
                        <div className="px-6 pb-6">
                          <P4Regular className="uppercase text-[#64748B] tracking-wider mb-2">
                            ANSWER
                          </P4Regular>
                          <div className="flex flex-wrap gap-2">
                            {q?.questionType === 'multiple_choice' &&
                              q?.questionTypeData?.choices?.map(
                                (c, choiceIndex) => (
                                  <P3Medium
                                    key={choiceIndex}
                                    className="px-3 py-1.5 bg-[#F1F5F9] rounded-8px"
                                  >
                                    {c?.text}
                                  </P3Medium>
                                )
                              )}
                            {q?.questionType === 'Boolean' && (
                              <>
                                <P3Medium className="px-3 py-1.5 bg-[#F1F5F9] rounded-8px">
                                  {q?.questionTypeData?.yes_label}
                                </P3Medium>
                                <P3Medium className="px-3 py-1.5 bg-[#F1F5F9] rounded-8px">
                                  {q?.questionTypeData?.no_label}
                                </P3Medium>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </Disclosure.Panel>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 border-t border-[#E2E8F0] px-6 py-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleKeepQuestion(index, false)}
                        className={`px-3 py-[6px] rounded-[4px] text-[11px] font-semibold transition-colors ${
                          !isSelected
                            ? 'bg-[#EF4444] text-white border-0 hover:bg-[#EF4444]'
                            : 'text-[#EF4444] border-0 hover:bg-[#F1F5F9] bg-[#F1F5F9]'
                        }`}
                      >
                        Discard
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleKeepQuestion(index, true)}
                        className={`px-3 py-[6px] rounded-[4px] text-[11px] font-semibold transition-colors ${
                          isSelected
                            ? 'bg-[#0FC083] text-white border-0 hover:bg-[#0FC083]'
                            : 'text-[#0FC083] border-0 hover:bg-[#F1F5F9] bg-[#F1F5F9]'
                        }`}
                      >
                        Keep
                      </Button>
                    </div>
                  </div>
                )}
              </Disclosure>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 p-6 border-t border-[#E2E8F0] ">
        <Button
          variant="outline"
          onClick={handleRegenerate}
          className="text-secondary border-0 w-full bg-[#F1F5F9]  px-6 py-[10px] flex items-cente mr-2"
        >
          Regenerate Questions
          <ArrowsClockwiseIcon className="h-4 w-4 pl-2" />
        </Button>

        <Button
          onClick={handleConfirmQuestions}
          disabled={!selectedQuestions.length || addQuestionLoading}
          className="bg-secondary  text-white w-full  px-6 py-[10px]  flex items-center gap-2"
        >
          {addQuestionLoading ? (
            <>
              <span className="animate-spin">
                <Loader2 size={16} />
              </span>
              Adding Questions...
            </>
          ) : (
            <>
              Confirm All Keep Questions
              <ChecksIcon className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <Sheet open={isAiModalOpen} onOpenChange={setIsAiModalOpen}>
      <SheetTrigger asChild>
        <div
          onClick={() => setIsAiModalOpen(true)}
          className="py-3 px-4 text-center mt-3 w-full bg-white rounded-md shadow-sm border cursor-pointer hover:bg-gray-50"
        >
          <div className="text-gray-600 tracking-wider flex justify-center items-center gap-2">
            <SparklesIcon className="text-emerald-500" size={16} />
            <P2Bold className="text-emerald-500">
              Design More Questions With AI
            </P2Bold>
          </div>
        </div>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl overflow-y-auto p-0"
      >
        <SheetHeader className=" border-b border-[#E2E8F0] px-[24px] py-[16px]">
          <P1Bold>Add Questions with AI</P1Bold>
        </SheetHeader>

        <div
          className={`mt-[32px] ${
            currentStep === 2 ? 'h-[calc(100vh-200px)]' : ''
          } `}
        >
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>
      </SheetContent>
    </Sheet>
  );
}
