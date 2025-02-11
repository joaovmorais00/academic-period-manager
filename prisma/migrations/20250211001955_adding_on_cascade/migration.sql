-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_assessmentActivityId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_complementaryActivityId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_createdByUserId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "AssessmentActivity" DROP CONSTRAINT "AssessmentActivity_createdByUserId_fkey";

-- DropForeignKey
ALTER TABLE "AssessmentActivity" DROP CONSTRAINT "AssessmentActivity_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "ComplementaryActivity" DROP CONSTRAINT "ComplementaryActivity_createdByUserId_fkey";

-- DropForeignKey
ALTER TABLE "Meet" DROP CONSTRAINT "Meet_assessment_ActivityId_fkey";

-- DropForeignKey
ALTER TABLE "Meet" DROP CONSTRAINT "Meet_complementary_ActivityId_fkey";

-- DropForeignKey
ALTER TABLE "Meet" DROP CONSTRAINT "Meet_createdByUserId_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_createdByUserId_fkey";

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_createdByUserId_fkey";

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_subjectId_fkey";

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_assessmentActivityId_fkey" FOREIGN KEY ("assessmentActivityId") REFERENCES "AssessmentActivity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_complementaryActivityId_fkey" FOREIGN KEY ("complementaryActivityId") REFERENCES "ComplementaryActivity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentActivity" ADD CONSTRAINT "AssessmentActivity_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentActivity" ADD CONSTRAINT "AssessmentActivity_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplementaryActivity" ADD CONSTRAINT "ComplementaryActivity_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meet" ADD CONSTRAINT "Meet_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meet" ADD CONSTRAINT "Meet_assessment_ActivityId_fkey" FOREIGN KEY ("assessment_ActivityId") REFERENCES "AssessmentActivity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meet" ADD CONSTRAINT "Meet_complementary_ActivityId_fkey" FOREIGN KEY ("complementary_ActivityId") REFERENCES "ComplementaryActivity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
