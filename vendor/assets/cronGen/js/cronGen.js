

(function ($) {
    
    var resultsName = "";
    var inputElement;
    var displayElement;
    
    $.fn.extend({
        cronGen: function () {
            //create top menu
            var cronContainer = $("<div/>", { id: "CronContainer", style: "display:none;width:300px;height:300px;" });
            var mainDiv = $("<div/>", { id: "CronGenMainDiv", style: "" });
            var topMenu = $("<ul/>", { "class": "nav nav-tabs", id: "CronGenTabs", style: "display:none" });
            $('<li/>', { 'class': 'active' }).html($('<a id="MinutesTab" href="#Minutes">Minutes</a>')).appendTo(topMenu);
            $('<li/>').html($('<a id="HourlyTab" href="#Hourly">Hourly</a>')).appendTo(topMenu);
            $('<li/>').html($('<a id="DailyTab" href="#Daily">Daily</a>')).appendTo(topMenu);
            $('<li/>').html($('<a id="WeeklyTab" href="#Weekly">Weekly</a>')).appendTo(topMenu);
            $('<li/>').html($('<a id="MonthlyTab" href="#Monthly">Monthly</a>')).appendTo(topMenu);
            $('<li/>').html($('<a id="YearlyTab" href="#Yearly">Yearly</a>')).appendTo(topMenu);
            $(topMenu).appendTo(mainDiv);
            $('<select id="select_tab" class="form-control" style=""></select>').appendTo(mainDiv);

            //create what's inside the tabs
            var container = $("<div/>", { "class": "", "style": "margin-top: 10px;margin-bottom: 10px;" });
            var row = $("<div/>", { "class": "row-fluid" });
            var span12 = $("<div/>", { "class": "span12" });
            var tabContent = $("<div/>", { "class": "tab-content" });

            //creating the minutesTab
            var minutesTab = $("<div/>", { "class": "tab-pane", id: "Minutes" });
            var minutesOption1 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "1", name: "MinuteRadio" }).appendTo(minutesOption1);
            $(minutesOption1).append("&nbsp;Every&nbsp;");
            $("<input/>", { id: "MinutesInput", type: "number", value: "1", style: "width: 60px;display: inline;", class: "form-control"}).appendTo(minutesOption1);
            $(minutesOption1).append("&nbsp;minute(s)");
            $(minutesOption1).appendTo(minutesTab);

            $(minutesTab).appendTo(tabContent);

            //creating the hourlyTab
            var hourlyTab = $("<div/>", { "class": "tab-pane", id: "Hourly" });

            var hourlyOption1 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "1", name: "HourlyRadio" }).appendTo(hourlyOption1);
            $(hourlyOption1).append("&nbsp;Every&nbsp;");
            $("<input/>", { id: "HoursInput", type: "number", value: "1", style: "width: 60px;display: inline;", class: "form-control" }).appendTo(hourlyOption1);
            $(hourlyOption1).append("&nbsp;hour(s)");
            $(hourlyOption1).appendTo(hourlyTab);

            var hourlyOption2 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "2", name: "HourlyRadio" }).appendTo(hourlyOption2);
            $(hourlyOption2).append("&nbsp;At&nbsp;");
            $(hourlyOption2).append('<select id="AtHours" class="hours form-control" style="width: 60px;display: inline;"></select>');
            $(hourlyOption2).append('<select id="AtMinutes" class="minutes form-control" style="width: 60px;display: inline;"></select>');
            $(hourlyOption2).appendTo(hourlyTab);

            $(hourlyTab).appendTo(tabContent);

            //craeting the dailyTab
            var dailyTab = $("<div/>", { "class": "tab-pane", id: "Daily" });

            var dailyOption1 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "1", name: "DailyRadio" }).appendTo(dailyOption1);
            $(dailyOption1).append("&nbsp;Every&nbsp;");
            $("<input/>", { id: "DaysInput", type: "number", value: "1", style: "width: 60px;display: inline;", class: "form-control" }).appendTo(dailyOption1);
            $(dailyOption1).append("&nbsp;day(s)");
            $(dailyOption1).appendTo(dailyTab);

            var dailyOption2 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "2", name: "DailyRadio" }).appendTo(dailyOption2);
            $(dailyOption2).append("&nbsp;Every week day&nbsp;");
            $(dailyOption2).appendTo(dailyTab);

            $(dailyTab).append("Start time&nbsp;");
            $(dailyTab).append('<select id="DailyHours" class="hours form-control" style="width: 60px;display: inline;"></select>');
            $(dailyTab).append('<select id="DailyMinutes" class="minutes form-control" style="width: 60px;display: inline;"></select>');

            $(dailyTab).appendTo(tabContent);

            //craeting the weeklyTab
            var weeklyTab = $("<div/>", { "class": "tab-pane", id: "Weekly" });
            var weeklyWell = $("<div/>", { "class": "well well-small" });

            var span31 = $("<div/>", { "class": "span6 col-sm-6" });
            $("<input/>", { type: "checkbox", value: "MON" }).appendTo(span31);
            $(span31).append("&nbsp;Monday<br />");
            $("<input/>", { type: "checkbox", value: "WED" }).appendTo(span31);
            $(span31).append("&nbsp;Wednesday<br />");
            $("<input/>", { type: "checkbox", value: "FRI" }).appendTo(span31);
            $(span31).append("&nbsp;Friday<br />");
            $("<input/>", { type: "checkbox", value: "SUN" }).appendTo(span31);
            $(span31).append("&nbsp;Sunday");

            var span32 = $("<div/>", { "class": "span6 col-sm-6" });
            $("<input/>", { type: "checkbox", value: "TUE" }).appendTo(span32);
            $(span32).append("&nbsp;Tuesday<br />");
            $("<input/>", { type: "checkbox", value: "THU" }).appendTo(span32);
            $(span32).append("&nbsp;Thursday<br />");
            $("<input/>", { type: "checkbox", value: "SAT" }).appendTo(span32);
            $(span32).append("&nbsp;Saturday");

            $(span31).appendTo(weeklyWell);
            $(span32).appendTo(weeklyWell);
            //Hack to fix the well box
            $("<br /><br /><br /><br />").appendTo(weeklyWell);

            $(weeklyWell).appendTo(weeklyTab);

            $(weeklyTab).append("Start time&nbsp;");
            $(weeklyTab).append('<select id="WeeklyHours" class="hours form-control" style="width: 60px;display: inline;"></select>');
            $(weeklyTab).append('<select id="WeeklyMinutes" class="minutes form-control" style="width: 60px;display: inline;"></select>');

            $(weeklyTab).appendTo(tabContent);

            //craeting the monthlyTab
            var monthlyTab = $("<div/>", { "class": "tab-pane", id: "Monthly" });

            var monthlyOption1 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "1", name: "MonthlyRadio" }).appendTo(monthlyOption1);
            $(monthlyOption1).append("&nbsp;Day&nbsp");
            $("<input/>", { id: "DayOfMOnthInput", type: "number", value: "1", style: "width: 60px;display: inline;", class: "form-control" }).appendTo(monthlyOption1);
            $(monthlyOption1).append("&nbsp;of every&nbsp;");
            $("<input/>", { id: "MonthInput", type: "number", value: "1", style: "width: 60px;display: inline;", class: "form-control" }).appendTo(monthlyOption1);
            $(monthlyOption1).append("&nbsp;month(s)");
            $(monthlyOption1).appendTo(monthlyTab);

            var monthlyOption2 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "2", name: "MonthlyRadio" }).appendTo(monthlyOption2);
            $(monthlyOption2).append("&nbsp;");
            $(monthlyOption2).append('<select id="WeekDay" class="day-order-in-month form-control" style="width: 80px;display: inline;"></select>');
            $(monthlyOption2).append('<select id="DayInWeekOrder" class="week-days form-control" style="width: 100px;display: inline;"></select>');
            $(monthlyOption2).append("&nbsp;of every&nbsp;");
            $("<input/>", { id: "EveryMonthInput", type: "number", value: "1", style: "width: 60px;display: inline;", class: "form-control" }).appendTo(monthlyOption2);
            $(monthlyOption2).append("&nbsp;month(s)");
            $(monthlyOption2).appendTo(monthlyTab);

            $(monthlyTab).append("Start time&nbsp;");
            $(monthlyTab).append('<select id="MonthlyHours" class="hours form-control" style="width: 60px;display: inline;"></select>');
            $(monthlyTab).append('<select id="MonthlyMinutes" class="minutes form-control" style="width: 60px;display: inline;"></select>');

            $(monthlyTab).appendTo(tabContent);

            //craeting the yearlyTab
            var yearlyTab = $("<div/>", { "class": "tab-pane", id: "Yearly" });

            var yearlyOption1 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "1", name: "YearlyRadio" }).appendTo(yearlyOption1);
            $(yearlyOption1).append("&nbsp;Every&nbsp");
            $(yearlyOption1).append('<select id="MonthsOfYear" class="months form-control" style="width: 150px;display: inline;"></select>');
            $(yearlyOption1).append("&nbsp;in day&nbsp;");
            $("<input/>", { id: "YearInput", type: "number", value: "1", style: "width: 60px;display: inline;", class: "form-control" }).appendTo(yearlyOption1);
            $(yearlyOption1).appendTo(yearlyTab);

            var yearlyOption2 = $("<div/>", { "class": "well well-small" });
            $("<input/>", { type: "radio", value: "2", name: "YearlyRadio" }).appendTo(yearlyOption2);
            $(yearlyOption2).append("&nbsp;The&nbsp;");
            $(yearlyOption2).append('<select id="DayOrderInYear" class="day-order-in-month form-control" style="width: 80px;display: inline;"></select>');
            $(yearlyOption2).append('<select id="DayWeekForYear" class="week-days form-control" style="width: 100px;display: inline;"></select>');
            $(yearlyOption2).append("&nbsp;of&nbsp;");
            $(yearlyOption2).append('<select id="MonthsOfYear2" class="months form-control" style="width: 110px;display: inline;"></select>');
            $(yearlyOption2).appendTo(yearlyTab);

            $(yearlyTab).append("Start time&nbsp;");
            $(yearlyTab).append('<select id="YearlyHours" class="hours form-control" style="width: 60px;display: inline;"></select>');
            $(yearlyTab).append('<select id="YearlyMinutes" class="minutes form-control" style="width: 60px;display: inline;"></select>');

            $(yearlyTab).appendTo(tabContent);
            $(tabContent).appendTo(span12);

            //creating the button and results input           
            resultsName = $(this).prop("name");
            $(this).prop("name", resultsName);

            $(span12).appendTo(row);
            $(row).appendTo(container);
            $(container).appendTo(mainDiv);
            $(cronContainer).append(mainDiv);
            
            var that = $(this);



            // Hide the original input
           //that.hide();

            // Replace the input with an input group
           //var $g = $("<div>").addClass("input-group");
            // Add an input
            //var $i = $("<input>", { id: 'execution_cron_trigger_replacement', type: 'text', placeholder: 'Click/Hover over edit button =>', readonly: 'readonly' }).addClass("form-control").val($(that).val()).attr('name', $(that).attr('name') );
           // $i.appendTo($g);
            // Add the button
           // var $b = $("<span class=\"input-group-addon btn btn-edit\"><i class=\"fa fa-edit\"></i></button>");
            // Put button inside span
           // $b.appendTo($g);

           // $(this).before($g);

            inputElement = that;
            //displayElement = $i;

            $('#cron_advanced .controls').html($(cronContainer).html());

            fillDataOfMinutesAndHoursSelectOptions();
            fillDayWeekInMonth();
            fillInWeekDays();
            fillInMonths();
            fillInSelectTab();

            $('#CronGenTabs a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
                generate();
            });
            $("#CronGenMainDiv select, #CronGenMainDiv input").change(function (e) {
                generate();
            });
            $("#CronGenMainDiv input").focus(function (e) {
                generate();
            });


            // $b.popover({
            //     html: true,
            //     content: function () {
            //         return $(cronContainer).html();
            //     },
            //     template: '<div class="popover bottom-scheduling" style="max-width:500px !important; width:500px"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>',
            //     placement: 'left',
            //     container: '#z_hub_modal',
            //     trigger: "manual"

            // }).on("mouseenter click", function (e) {

            //     var _this = this;
            //     $(this).popover("show");
            //     $('.popover.bottom-scheduling').css('top', '106px');
            //     e.preventDefault();
                
            //     fillDataOfMinutesAndHoursSelectOptions();
            //     fillDayWeekInMonth();
            //     fillInWeekDays();
            //     fillInMonths();
            //     $('#CronGenTabs a').click(function (e) {
            //         e.preventDefault();
            //         $(this).tab('show');
            //         //generate();
            //     });
            //     $("#CronGenMainDiv select, #CronGenMainDiv input").change(function (e) {
            //         generate();
            //     });
            //     $("#CronGenMainDiv input").focus(function (e) {
            //         generate();
            //     });

            //     $(".popover").on("mouseleave", function () {
            //         setTimeout(function () {
            //         $(_this).popover('hide');
            //         }, 500);
            //     });
            // }).on("mouseleave", function () {
            //     var _this = this;
            //     setTimeout(function () {
            //         if (!$(".popover.bottom-scheduling:hover").length) {
            //             $(_this).popover("hide");
            //         }
            //     }, 100);
            // });
            return;
        }
    });
    

    var fillInMonths = function () {
        var days = [
            { text: "January", val: "1" },
            { text: "February", val: "2" },
            { text: "March", val: "3" },
            { text: "April", val: "4" },
            { text: "May", val: "5" },
            { text: "June", val: "6" },
            { text: "July", val: "7" },
            { text: "August", val: "8" },
            { text: "September", val: "9" },
            { text: "October", val: "10" },
            { text: "Novermber", val: "11" },
            { text: "December", val: "12" }
        ];
        $(".months").each(function () {
            fillOptions(this, days);
        });
    };

    var fillOptions = function (elements, options) {
        for (var i = 0; i < options.length; i++)
            $(elements).append("<option value='" + options[i].val + "'>" + options[i].text + "</option>");
    };
    var fillDataOfMinutesAndHoursSelectOptions = function () {
        for (var i = 0; i < 60; i++) {
            if (i < 24) {
                $(".hours").each(function () { $(this).append(timeSelectOption(i)); });
            }
            $(".minutes").each(function () { $(this).append(timeSelectOption(i)); });
        }
    };
    var fillInWeekDays = function () {
        var days = [
            { text: "Monday", val: "MON" },
            { text: "Tuesday", val: "TUE" },
            { text: "Wednesday", val: "WED" },
            { text: "Thursday", val: "THUR" },
            { text: "Friday", val: "FRI" },
            { text: "Saturday", val: "SAT" },
            { text: "Sunday", val: "SUN" }
        ];
        $(".week-days").each(function () {
            fillOptions(this, days);
        });

    };
    var fillInSelectTab = function () {
        var tabs = [
            { text: "", val: "" },
            { text: "Minutes", val: "#Minutes" },
            { text: "Hourly", val: "#Hourly" },
            { text: "Daily", val: "#Daily" },
            { text: "Weekly", val: "#Weekly" },
            { text: "Monthly", val: "#Monthly" },
            { text: "Yearly", val: "#Yearly" },
        ];
        $("#select_tab").each(function () {
            fillOptions(this, tabs);
        });

        $("#select_tab").change(function(){
            $($(this).val()).addClass('active')
            $("a[href='" + $(this).val() + "']").tab('show');
            generate();
        });
        $('#select_tab').select2({minimumResultsForSearch: Infinity, width: "100%", theme: "bootstrap", placeholder: "Select to begin schedule builder"});
    };
    var fillDayWeekInMonth = function () {
        var days = [
            { text: "First", val: "1" },
            { text: "Second", val: "2" },
            { text: "Third", val: "3" },
            { text: "Fourth", val: "4" }
        ];
        $(".day-order-in-month").each(function () {
            fillOptions(this, days);
        });
    };
    var displayTimeUnit = function (unit) {
        if (unit.toString().length == 1)
            return "0" + unit;
        return unit;
    };
    var timeSelectOption = function (i) {
        return "<option id='" + i + "'>" + displayTimeUnit(i) + "</option>";
    };

    var generate = function () {

        var activeTab = $("ul#CronGenTabs li.active a").prop("id");
        var results = "";
        switch (activeTab) {
            case "MinutesTab":
                results = "0 /" + $("#MinutesInput").val() + " * /1 * *";
                break;
            case "HourlyTab":
                switch ($("input:radio[name=HourlyRadio]:checked").val()) {
                    case "1":
                        results = "0 0 /" + $("#HoursInput").val() + " /1 * *";
                        break;
                    case "2":
                        results = "0 " + Number($("#AtMinutes").val()) + " " + Number($("#AtHours").val()) + " /1 * *";
                        break;
                }
                break;
            case "DailyTab":
                switch ($("input:radio[name=DailyRadio]:checked").val()) {
                    case "1":
                        results = "0 " + Number($("#DailyMinutes").val()) + " " + Number($("#DailyHours").val()) + " /" + $("#DaysInput").val() + " * *";
                        break;
                    case "2":
                        results = "0 " + Number($("#DailyMinutes").val()) + " " + Number($("#DailyHours").val()) + " * * MON-FRI";
                        break;
                }
                break;
            case "WeeklyTab":
                var selectedDays = "";
                $("#Weekly input:checkbox:checked").each(function () { selectedDays += $(this).val() + ","; });
                if (selectedDays.length > 0)
                    selectedDays = selectedDays.substr(0, selectedDays.length - 1);
                results = "0 " + Number($("#WeeklyMinutes").val()) + " " + Number($("#WeeklyHours").val()) + " * * " + selectedDays + "";
                break;
            case "MonthlyTab":
                switch ($("input:radio[name=MonthlyRadio]:checked").val()) {
                    case "1":
                        results = "0 " + Number($("#MonthlyMinutes").val()) + " " + Number($("#MonthlyHours").val()) + " " + $("#DayOfMOnthInput").val() + " /" + $("#MonthInput").val() + " *";
                        break;
                    case "2":
                        results = "0 " + Number($("#MonthlyMinutes").val()) + " " + Number($("#MonthlyHours").val()) + " * /" + Number($("#EveryMonthInput").val()) + " " + $("#DayInWeekOrder").val() + "#" + $("#WeekDay").val() + "";
                        break;
                }
                break;
            case "YearlyTab":
                switch ($("input:radio[name=YearlyRadio]:checked").val()) {
                    case "1":
                        results = "0 " + Number($("#YearlyMinutes").val()) + " " + Number($("#YearlyHours").val()) + " " + $("#YearInput").val() + " " + $("#MonthsOfYear").val() + " *";
                        break;
                    case "2":
                        results = "0 " + Number($("#YearlyMinutes").val()) + " " + Number($("#YearlyHours").val()) + " * " + $("#MonthsOfYear2").val() + " " + $("#DayWeekForYear").val() + "#" + $("#DayOrderInYear").val() + "";
                        break;
                }
                break;
        }

        //console.log(results);
        // Update original control
        inputElement.val(results).change();
        //tools_validator.element(inputElement);

        // Update display
        //displayElement.val(results);
    };

})(jQuery);

