export const languages = [
  {
    key: "cpp",
    value: "cpp",
    text: "C++",
    mode: "c_cpp",
    template: `#include<iostream>
using namespace std;
int main() {
    cout<<"Hello World";
    return 0; 
}`,
  },
  {
    key: "c",
    value: "c",
    text: "C",
    mode: "c_cpp",
    template: `#include<stdio.h>
int main() {
    cout<<"Hello World";
    return 0;
}`,
  },
  {
    key: "java",
    value: "java",
    text: "JAVA",
    mode: "java",
    template: `class HelloWorld
{
   public static void main(String args[])
      {
         System.out.println("Hello, World");
      }
}`,
  },
  {
    key: "py",
    value: "py",
    text: "PYTHON 3",
    mode: "python",
    template: `#Your Code Goes Here
Print("Hello world!")`,
  },
];

export const themes = [
  { key: "mo", value: "monokai", text: "Monokai" },
  {
    key: "tw",
    value: "twilight",
    text: "Twilight",
  },
  {
    key: "git",
    value: "github",
    text: "Github",
  },
  {
    key: "da",
    value: "dawn",
    text: "Dawn",
  },
  {
    key: "to",
    value: "tomorrow",
    text: "Tomorrow",
  },
  {
    key: "xc",
    value: "xcode",
    text: "Xcode",
  },
];
