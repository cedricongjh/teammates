package teammates.e2e.cases.playwright.pages;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;

public class InstructorStudentRecordsPage extends BasePage {

  Locator headerText = page.locator("#records-header");
  
  public InstructorStudentRecordsPage(Page page) {
    super(page);
  }

  public void verifyIsCorrectPage(String courseId, String studentName) {
    assertThat(headerText).hasText(String.format("%s's Records - %s", studentName, courseId));
  }
}
