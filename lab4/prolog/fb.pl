fib(0, 1) :- !.
fib(1, 1) :- !.
fib(N, Result) :- 
	N1 is N - 1, 
	N2 is N - 2, 
	fib(N1, Result1), 
	fib(N2, Result2), 
	Result is Result1 + Result2.

writeNumber(X) :- 
	X_NEW is X, write(X_NEW), write(" ").

continueCalc(A, B, I) :-
	I_NEW is I + 1, 
	fibonacci(A, B, I_NEW).

inSegemnt(A, B, I, V) :-
	writeNumber(V),
	continueCalc(A, B, I).

outSegment(A, B, I, V) :-
	(V < B -> continueCalc(A, B, I); true).

fibonacci(A, B, I) :-
	fib(I, V),
	(V >= A, V =< B -> inSegemnt(A, B, I, V); outSegment(A, B, I, V)).

main :-
	write("Input A"), nl,
	read(A), nl,
	write("Input B"), nl,
	read(B), nl,
	fibonacci(A, B, 0).

