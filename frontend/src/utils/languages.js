const languages = [
  {
    key: "cpp",
    value: "cpp",
    text: "C++",
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
    template: ``,
  },
  {
    key: "py",
    value: "py",
    text: "PYTHON 3",
    template: ``,
  },
];

export default languages;
