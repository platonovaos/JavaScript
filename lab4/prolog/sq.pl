funSquare(I, Result) :- 
	Result is I * I.

writeNumber(X) :- 
	X_NEW is X, write(X_NEW), write(" ").

continueCalc(A, B, I) :-
	I_NEW is I + 1, 
	fsquare(A, B, I_NEW).

inSegemnt(A, B, I, V) :-
	writeNumber(V),
	continueCalc(A, B, I).

outSegment(A, B, I, V) :-
	(V < B -> continueCalc(A, B, I); true).

fsquare(A, B, I) :-
	funSquare(I, V),
	(V >= A, V =< B -> inSegemnt(A, B, I, V); outSegment(A, B, I, V)).

main :-
	write("Input A"), nl,
	read(A), nl,
	write("Input B"), nl,
	read(B), nl,
	fsquare(A, B, 0).