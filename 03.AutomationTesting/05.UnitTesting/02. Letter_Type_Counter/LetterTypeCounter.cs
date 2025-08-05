using System;
using System.Collections.Generic;

namespace TestApp;

public class LetterTypeCounter
{
    public static Dictionary<string, int> CountLetterTypes(string sentence)
    {
        if (string.IsNullOrEmpty(sentence)) return new Dictionary<string, int>();

        int evenLetterCount = 0, oddLetterCount = 0, nonLetterCount = 0;

        foreach (char character in sentence)
        {
            if (char.IsLetter(character))
            {
                if ((int)character % 2 == 0) evenLetterCount++;
                else oddLetterCount++;
            } 
            else nonLetterCount++;
        }

        var result = new Dictionary<string, int>();

        if (evenLetterCount > 0) result["even letter"] = evenLetterCount;
        if (oddLetterCount > 0) result["odd letter"] = oddLetterCount;
        if (nonLetterCount > 0) result["non-letter"] = nonLetterCount;

        return result;
    }
}
