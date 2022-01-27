export const findMonthCharacter = (year: number, month: number) => {
    const evenYear = year % 2;
    let character: string;

    if (evenYear && month === 1) character = "А";
    else if (evenYear && month === 2) character = "Б";
    else if (evenYear && month === 3) character = "В";
    else if (evenYear && month === 4) character = "Г";
    else if (evenYear && month === 5) character = "Д";
    else if (evenYear && month === 6) character = "Е";
    else if (evenYear && month === 7) character = "Ж";
    else if (evenYear && month === 8) character = "З";
    else if (evenYear && month === 9) character = "И";
    else if (evenYear && month === 10) character = "К";
    else if (evenYear && month === 11) character = "Л";
    else if (evenYear && month === 12) character = "М";
    else if (!evenYear && month === 1) character = "Н";
    else if (!evenYear && month === 2) character = "О";
    else if (!evenYear && month === 3) character = "П";
    else if (!evenYear && month === 4) character = "Р";
    else if (!evenYear && month === 5) character = "С";
    else if (!evenYear && month === 6) character = "Т";
    else if (!evenYear && month === 7) character = "У";
    else if (!evenYear && month === 8) character = "Ф";
    else if (!evenYear && month === 9) character = "Х";
    else if (!evenYear && month === 10) character = "Ц";
    else if (!evenYear && month === 11) character = "Ч";
    else if (!evenYear && month === 12) character = "Ш";

    return character;
};

