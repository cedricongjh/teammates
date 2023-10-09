package teammates.e2e.cases.playwright.pages;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

import com.microsoft.playwright.Page;

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

    public String getDisplayedDateTime(Instant instant, String timeZone, String pattern) {
        ZonedDateTime zonedDateTime = TimeHelper.getMidnightAdjustedInstantBasedOnZone(instant, timeZone, false)
                .atZone(ZoneId.of(timeZone));
        return DateTimeFormatter.ofPattern(pattern).format(zonedDateTime);
    }
}
