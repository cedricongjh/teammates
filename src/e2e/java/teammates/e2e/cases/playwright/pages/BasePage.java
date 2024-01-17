package teammates.e2e.cases.playwright.pages;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.SelectOption;

import teammates.common.util.AppUrl;
import teammates.common.util.TimeHelper;

public class BasePage {
    protected final Page page;

    public BasePage(Page page) {
        this.page = page;
    }

    public void navigateWithAppUrl(AppUrl url) {
        page.navigate(url.toAbsoluteString());
    }

    public void waitForConfirmationModalAndClickOk() {
        Locator okayButton = page.locator(".modal-btn-ok");
        okayButton.click();
    }

    public void verifyStatusMessage(String message) {
        assertThat(page.locator(".toast-body")).containsText(message);;
    }

    public static <T extends BasePage> T getNewPageInstance(Page page, Class<T> typeOfPage) {
        try{
            Constructor<T> constructor = typeOfPage.getConstructor(Page.class);
            T newPage = constructor.newInstance(page);
            return newPage;
        } catch (InvocationTargetException e) {
            if (e.getCause() instanceof IllegalStateException) {
                throw (IllegalStateException) e.getCause();
            }
            throw new RuntimeException(e);
        } catch (NoSuchMethodException | IllegalAccessException | InstantiationException e) {
            throw new RuntimeException(e);
        }
    }

    public String getDisplayedDateTime(Instant instant, String timeZone, String pattern) {
        ZonedDateTime zonedDateTime = TimeHelper.getMidnightAdjustedInstantBasedOnZone(instant, timeZone, false)
                .atZone(ZoneId.of(timeZone));
        return DateTimeFormatter.ofPattern(pattern).format(zonedDateTime);
    }

    protected void selectDropdownOptionByText(Locator dropdown, String text) {
        dropdown.selectOption(new SelectOption().setLabel(text));
    }

    protected void fillDatePicker(Locator dateBox, Instant startInstant, String timeZone) {
        dateBox.locator("button").click();

        Locator datePicker = dateBox.locator("ngb-datepicker");
        Locator monthAndYearPicker = datePicker.locator("ngb-datepicker-navigation-select");
        Locator monthPicker = monthAndYearPicker.locator("[title='Select month']");
        Locator yearPicker = monthAndYearPicker.locator("[title='Select year']");
        Locator dayPicker = datePicker.locator("ngb-datepicker-month");

        String year = getYearString(startInstant, timeZone);
        String month = getMonthString(startInstant, timeZone);
        String date = getFullDateString(startInstant, timeZone);

        selectDropdownOptionByText(yearPicker, year);
        selectDropdownOptionByText(monthPicker, month);
        dayPicker.locator(String.format("[aria-label='%s']", date)).click();;
    }

    private String getFullDateString(Instant instant, String timeZone) {
        return getDisplayedDateTime(instant, timeZone, "EEEE, MMMM d, yyyy");
    }

    private String getYearString(Instant instant, String timeZone) {
        return getDisplayedDateTime(instant, timeZone, "yyyy");
    }

    private String getMonthString(Instant instant, String timeZone) {
        return getDisplayedDateTime(instant, timeZone, "MMM");
    }
}
