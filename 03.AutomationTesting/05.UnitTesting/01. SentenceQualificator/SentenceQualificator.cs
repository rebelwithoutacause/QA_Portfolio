using System;
using System.Text;

namespace TestApp;

public class SentenceQualificator
{
    public static string QualifySentence(string sentence)
    {
        if (string.IsNullOrWhiteSpace(sentence))
        {
            return "neutral";
        }

        int asciiSum = 0;

        foreach (char character in sentence)
        {
            asciiSum += (int)character;
        }

        if (asciiSum == 0)
        {
            return "neutral";
        }
        else if (asciiSum % 2 == 0)
        {
            return "lucky sentence";
        }
        else
        {
            return "unlucky sentence";
        }
    }
}

