# KeySolve

## How to Use

**Search**  
You can search for layouts by clicking the layout header and typing in a layout name. The search bar will provide completion suggestions as you type.

**Swaps**  
You can swap letters around by clicking a key on the heatmap and dragging it over another key.

**Toggle Ngram/Use Metrics**  
You can toggle between the bigram/trigram/skipgram table and the use table by clicking the `stats` button.

**Copy and Paste**  
By clicking the button with the gear icon, you can see the layout in text form. Here you can either copy the layout to easily share it or use it with other analyzers, or you can paste in another layout.

**Misc Features**  
- You can flip a layout by clicking the `mirror` button.
- You can toggle between an ortholinear board or a row-staggered board by clicking the `board` button.

## Metric Classes

**Bigrams**  
A bigram is a pattern of two letters that occur next to each other. All bigram metrics have the letter `B` at the end of their abbreviation. 
- The word `the` has two bigrams: `th` and `he`.

**Skipgrams**  
A skipgram is a pattern of two letters that are separated by any other letter. All skipgram metrics have the letter `S` at the end of their abbreviation.
- The word `the` has only one skipgram: `te`.

**Trigrams**  
A trigram is a pattern of three letters that occur next to each other. 
- The word `the` has only one trigram: `the`.

## Bigram Types

**SF (Same Finger)**  
SFs are patterns that involve using the same finger twice to hit both letters. These sequences are generally very slow and should be minimized as much as possible.
- On QWERTY, `ed` is a very common SFB.

**LS (Lateral Stretch)**  
Lateral stretches are patterns that involve reaches into the outer index column with the index followed or preceded by middle finger use.
- On QWERTY, `et`, `ct`, and 'eg` are all examples of LSBs.

**HS (Half-Scissor)**  
A half-scissor is a pattern where one finger needs to stretch or contract to press a key on the top or bottom row and another finger on the same hand stays on the homerow - but the finger that is on the lower of the two rows is either middle or ring.
- `ok`, `sc`, and `rd` are common examples of half-scissors on QWERTY.

**FS (Full-Scissor)**  
A full-scissor is a pattern where one finger needs to reach to the top row and another finger on the same hand needs to contract to hit the bottom row - but the finger that is on the lower of two rows is either middle or ring.
- `cr`, `ex`, `xt` are all FSBs on QWERTY.

## Trigram Types

**ALT (Alternation)**  
An alternation sequence is when hand use alternates over three consecutive keypresses - either Left-Right-Left or Right-Left-Right.

**ROL (Roll)**  
A roll is when one hand presses two keys consecutively and is followed or preceded by a keypress on the other hand - either Left-Left-Right, Left-Right-Right, Right-Left-Left, or Right-Right-Left.

**ONE (Onehand)**  
A onehand is when all three keypresses are pressed on the same hand, and in an order from left to right or right to left.
- `asd`, `sdf`, and `fds` are all onehands on QWERTY.

**RED (Redirect)**  
A redirect is when all three keypresses are pressed on the same hand but don't occur in a smooth order.
- `sea`, `sca`, and `rse` are all redirects on QWERTY.
